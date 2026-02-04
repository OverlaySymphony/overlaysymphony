import createDefer from "@overlaysymphony/core/libs/defer"
import createPubSub from "@overlaysymphony/core/libs/pubsub"

import { type Authentication } from "../authentication/index.ts"

import {
  type TwitchChatEvent,
  type TwitchChatEventType,
} from "./interfaces/index.ts"
import parseCommand from "./parser.ts"

type ChatListener = (callback: (event: TwitchChatEvent) => void) => () => void

type ChatSubscriber = <
  EventType extends TwitchChatEventType,
  Event extends TwitchChatEvent<EventType>,
>(
  types: EventType[],
  callback: (event: Event) => void,
) => () => void

type ChatSender = (message: string) => void

type ChatMessageSubscriber = (
  callback: (event: TwitchChatEvent<"PRIVMSG">) => void,
) => () => void

interface ChatCommandSubscriber {
  (
    name: string,
    callback: (event: TwitchChatEvent<"PRIVMSG-COMMAND">) => void,
    _?: never,
  ): () => void
  (
    name: string,
    pattern: string,
    callback: (event: TwitchChatEvent<"PRIVMSG-COMMAND">) => void,
  ): () => void
}

export interface TwitchChat {
  listen: ChatListener
  subscribe: ChatSubscriber
  send: ChatSender
  onMessage: ChatMessageSubscriber
  onCommand: ChatCommandSubscriber
}

export default async function createChat(
  authentication: Authentication,
  channel: string = authentication.user.login,
): Promise<TwitchChat> {
  const { promise, resolve } = createDefer()

  const pubsub = createPubSub<TwitchChatEvent>()
  const socket = new WebSocket("wss://irc-ws.chat.twitch.tv:443")

  socket.addEventListener("open", (connection) => {
    socket.send("CAP REQ :twitch.tv/tags twitch.tv/commands")
  })

  socket.addEventListener("message", ({ data }: { data: string }) => {
    const messages = data.split("\r\n").filter(Boolean)
    for (const input of messages) {
      const command = parseCommand(input)
      if (!command) {
        continue
      }

      if (
        command.type === "001" ||
        command.type === "JOIN" ||
        command.type === "USERSTATE" ||
        command.type === "HOSTTARGET" ||
        command.type === "NOTICE"
      ) {
        continue
      }

      if (command.type === "PING") {
        socket.send(`PONG :${command.message}`)
        continue
      }

      if (command.type === "CAP") {
        socket.send(`PASS oauth:${authentication.accessToken}`)
        socket.send(`NICK ${authentication.user.login}`)
        continue
      }

      if (command.type === "RECONNECT") {
        console.warn("The server is about to terminate for maintenance.")
        continue
      }

      if (command.type === "GLOBALUSERSTATE") {
        socket.send(`JOIN #${channel}`)
        continue
      }

      if (command.type === "ROOMSTATE") {
        resolve()
        continue
      }

      pubsub.dispatch(command)
    }
  })

  return promise.then(() => {
    const listen: ChatListener = (callback) => {
      return pubsub.subscribe((event) => {
        callback(event)
      })
    }

    const subscribe: ChatSubscriber = (types, callback) => {
      return pubsub.subscribe((event) => {
        // @ts-expect-error: generic events are complicated
        if (types.includes(event.type)) {
          // @ts-expect-error: generic events are complicated
          callback(event)
        }
      })
    }

    const send: ChatSender = (message) => {
      socket.send(`PRIVMSG #${authentication.user.login} :${message}`)
    }

    const onMessage: ChatMessageSubscriber = (callback) => {
      return pubsub.subscribe((event) => {
        if (event.type === "PRIVMSG") {
          callback(event)
        }
      })
    }

    const onCommand: ChatCommandSubscriber = (name, ...args) => {
      const pattern = typeof args[0] === "string" ? args[0] : undefined

      const callback = typeof args[0] === "function" ? args[0] : args[1]
      if (!callback) {
        throw new Error("onCommand: Missing callback.")
      }

      return pubsub.subscribe((event) => {
        if (event.type === "PRIVMSG-COMMAND") {
          if (typeof name === "undefined" || event.command === name) {
            if (pattern) {
              // event.parameters = event.parameters
            }

            callback(event)
          }
        }
      })
    }

    return {
      listen,
      subscribe,
      send,
      onMessage,
      onCommand,
    }
  })
}
