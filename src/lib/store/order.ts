import type { Order } from '$lib/types/index'
import { get } from 'svelte/store'
import { uuid } from 'uuid'
import { writable } from 'svelte/store'


export const makeOrder = (oldId?: string) => {
  const id = uuid()
  const store = writable<Order>({
    id,
    name: '',
    items: []
  }, () => {
    return function stop() {
      localStorage.setItem(id, JSON.stringify(get(store)))
    }
  })

  if (oldId) {
    const jsStr = localStorage.getItem(oldId)
    store.set(JSON.parse(jsStr))
  }

  return store
}
