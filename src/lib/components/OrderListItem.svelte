<script lang="ts">
	import type { Writeable } from 'svelte/store';
	import type { Order } from '$lib/types/index';
	export let item: Writable<Order>;
	import { goto } from '$app/navigation';
	import { makeAll, makeOrder, renderPrice, getTotal } from '$lib/store/order';

</script>

<div
	on:click={() => goto($item.id)}
	class="flex flex-row h-12 items-center justify-between px-16 hover:shadow-lg"
>
	<div>Order for: {$item.name || 'No name'}</div>
	<div>Total: {renderPrice(getTotal($item).total)}</div>
</div>
