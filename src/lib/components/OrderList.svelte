<script lang="ts">
  import type { Writable } from "svelte/store"
  import type { Order } from "$lib/types/index"
  import { getContext } from 'svelte'
  import { getTotal, renderPrice } from '$lib/store/order'
  export let path: string
  const order = getContext<Writable<Order>>(path)

  let total = 0
  let subtotal = 0
  $: {
    const t = getTotal($order)
    total = t.total
    subtotal = t.subtotal
  }
</script>
<ul class="divide-y divide-gray-200 bg-blue-900 h-full text-white p-3 flex flex-col justify-start text-xl">
  {#if !order || $order?.items?.length === 0}
    <div>This order doesn't contain any items yet</div>
  {:else if !!order}
    {#each $order.items as item}
      <li class="py-4 w-full flex flex-row justify-between">
        <div>
          {item.count} x {item.name}
        </div>
        <div>{renderPrice(item.price)}<div>
      </li>
    {/each}
    <div class="py-4 w-full flex flex-row justify-between mt-auto">
      <div>Subtotal</div>
      <div >{renderPrice(subtotal)}</div>
    </div>
    <div class="py-4 w-full flex flex-row justify-between">
      <div>Total</div>
      <div>{renderPrice(total)}</div>
    </div>
  {/if}
  <!-- More items... -->
</ul>
