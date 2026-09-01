import {
  type ModuleEvent,
  type ModuleRunner,
} from "@overlaysymphony/core/module"

import type manifest from "./manifest.ts"

type Listener = (event: ModuleEvent) => void
type Unsubscribe = () => Promise<void>

type Instance = {
  subscribeManual: (label: string, listener: Listener) => Promise<Unsubscribe>
  subscribeInterval: (
    duration: number,
    listener: Listener,
  ) => Promise<Unsubscribe>
}

declare global {
  interface Window {
    osManual?: (label: string) => void
  }
}

const runner: ModuleRunner<"owner", typeof manifest, Instance> = async (
  config,
  store,
  emit,
) => {
  const manual = new Map<string, Set<Listener>>()

  const raise = (data: Record<string, unknown>): ModuleEvent => {
    const event: ModuleEvent = { id: crypto.randomUUID(), ...data }
    emit(event)

    return event
  }

  window.osManual = (label) => {
    const listeners = manual.get(label)
    if (!listeners?.size) {
      throw new Error(`No manual trigger is registered for "${label}".`)
    }

    const event = raise({ source: "manual", label })
    for (const listener of listeners) {
      listener(event)
    }
  }

  const instance: Instance = {
    subscribeManual: async (label, listener) => {
      const listeners = manual.get(label) ?? new Set<Listener>()
      listeners.add(listener)
      manual.set(label, listeners)

      return async () => {
        listeners.delete(listener)
      }
    },

    subscribeInterval: async (duration, listener) => {
      const timer = setInterval(() => {
        listener(raise({ source: "interval", duration }))
      }, duration * 1000)

      return async () => {
        clearInterval(timer)
      }
    },
  }

  return {
    instance,

    close: async () => {
      manual.clear()
      delete window.osManual
    },

    subscribers: {
      // raised by the dock once the module reports ready, never from here
      "composition-init": async (instance, inputs, emit) => async () =>
        undefined,

      manual: async (instance, inputs, emit) =>
        instance.subscribeManual(inputs.label, (event) => emit(event.id)),

      interval: async (instance, inputs, emit) =>
        instance.subscribeInterval(inputs.duration, (event) => emit(event.id)),
    },

    matchers: {
      "composition-init": async (instance, inputs, event) => true,

      manual: async (instance, inputs, event) => event.label === inputs.label,

      interval: async (instance, inputs, event) => true,
    },
  }
}

window.registerOSOwnerModule?.(import.meta.url, runner)
