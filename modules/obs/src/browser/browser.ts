/// <reference types="obs-studio" />
/// <reference types="../obs-studio.d.ts" />

import "./events/index.js"

import createEvents, { type Events } from "@overlaysymphony/core/libs/events"

import { ControlLevel, getControlLevel } from "./actions-helpers.ts"
import { type EventPayload, createSubscription } from "./events-helpers.js"

export type ObsBrowser = Events<EventPayload>

export default async function createBrowser(): Promise<ObsBrowser> {
  return createEvents<EventPayload, ControlLevel>(
    async (pubsub) => {
      const level = await getControlLevel()
      if (level === ControlLevel.MISSING) {
        console.error(
          "OBS Browser bindings not available. Please run in an OBS browser source.",
        )
        return null
      }

      const version = obsstudio?.pluginVersion
      if (!version) {
        console.error(
          `Invalid OBS Browser version. Needs at least x but found ${version}.`,
        )
        return null
      }

      return level
    },
    async (pubsub, level, type) => {
      await createSubscription(level, type, (payload) => {
        pubsub.dispatch(payload)
      })
    },
  )
}
