import { type TwitchEventSub } from "../../eventsub/index.js"

export interface Poll {
  id: string
  title: string
  choices: Array<{
    id: string
    title: string
    votes: number
    votesBits: number
    votesChannelPoints: number
    votesNormal: number
  }>
  endsAt?: Date
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
    id: "",
    title: "",
    choices: [],
    endsAt: undefined,
  }

  eventsub.on(
    ["channel.poll.begin", "channel.poll.progress", "channel.poll.end"],
    (payload) => {
      // Twitch sometimes sends duplicate end events.
      if (payload.type === "channel.poll.end") {
        // Skip if its already ended
        if (typeof poll.endsAt === "undefined") return

        // Skip if its for the wrong poll.
        if (payload.event.id !== poll.id) return
      }

      poll.id = payload.event.id
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
        poll.endsAt = new Date(payload.event.ends_at)
      } else {
        poll.endsAt = undefined
      }

      handlePoll(poll, mapTypeToTrigger[payload.type])
    },
  )
}
