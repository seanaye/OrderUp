<script lang="ts">
	import { get } from 'svelte/store';
	import { makeAll, makeOrder, renderPrice, getTotal } from '$lib/store/order';
	import Button from '$lib/components/Button.svelte';
	import OrderListItem from "$lib/components/OrderListItem.svelte"

	let items = [];
	if (typeof window !== 'undefined') {
		items = makeAll();
	}
	console.log({ items })
	function newOrder() {
		const order = makeOrder();
		const val = get(order);
		goto(val.id)
	}

</script>

<div class="divide-y divide-dashed">
{#each items as item}
	<OrderListItem {item} />
{/each}
</div>
<div class="absolute top-6 right-6">
	<Button on:click={newOrder} >
		<svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
		</svg>
	</Button>
</div>
