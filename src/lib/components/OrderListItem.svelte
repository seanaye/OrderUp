<script lang="ts">
	import { goto } from '$app/navigation';
	import { makeOrder, renderPrice, getTotal } from '$lib/store/order';

	export let item: ReturnType<typeof makeOrder>;

	$: textClass = $item.complete ? "line-through text-gray-500" : ""
</script>

<div
	on:click={() => goto($item.id)}
	class="flex flex-row h-12 items-center justify-between px-16 hover:shadow-lg"
>
	<div>
		<input type="checkbox" class="form-checkbox" bind:checked={$item.complete} on:click={e => e.stopPropagation()}>
		<span class={textClass}>Order for: {$item.name || 'No name'}
	</div>
	<div class={textClass}>Total: {renderPrice(getTotal($item).total)}</div>
</div>
