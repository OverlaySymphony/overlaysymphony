import { TwitchEventSub } from "../../eventsub/index.js"

export interface Poll {
  title: string
  choices: Array<{
    id: string
    title: string
    votes: number
    votesBits: number
    votesChannelPoints: number
    votesNormal: number
  }>
  endsAt: Date
}

const mapTypeToTrigger = {
  "channel.poll.begin": "begin",
  "channel.poll.progress": "progress",
  "channel.poll.end": "end",
} as const

export function onPoll(
  eventsub: TwitchEventSub,
  handlePoll: (poll: Poll, trigger: "begin" | "progress" | "end") => void,
): void {
  const poll: Poll = {
    title: "",
    choices: [],
    endsAt: new Date(""),
  }

  eventsub.subscribe(
    ["channel.poll.begin", "channel.poll.progress", "channel.poll.end"],
    (payload) => {
      poll.title = payload.event.title
      poll.choices = payload.event.choices.map(
        ({
          id,
          title,
          votes = 0,
          channel_points_votes = 0,
          bits_votes = 0,
        }) => ({
          id,
          title,
          votes: votes,
          votesBits: bits_votes,
          votesChannelPoints: channel_points_votes,
          votesNormal: votes - channel_points_votes - bits_votes,
        }),
      )

      if (
        payload.type === "channel.poll.begin" ||
        payload.type === "channel.poll.progress"
      ) {
        poll.endsAt = payload.event.ends_at
      }

      handlePoll(poll, mapTypeToTrigger[payload.type])
    },
  )
}
