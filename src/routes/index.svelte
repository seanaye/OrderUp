<script lang="ts">
	import type { Item } from '$lib/types/index'

	const menuItems: Array<Item> = [
		{ id: 0, name: "Spicy Beef", price: 399 },
		{ id: 1, name: "Chicken", price: 280 },
		{ id: 2, name: "Bruh", price: 280 },
		{ id: 3, name: "Dis Dick", price: 280 },
		{ id: 4, name: "Yo Mama", price: 280 },
		{ id: 5, name: "Bolognea", price: 280 },
		{ id: 6, name: "Spaghet", price: 280 },
		{ id: 7, name: "Seared Penis", price: 280 },
		{ id: 8, name: "Spring Roll", price: 280 },
	]
</script>
<div class="grid grid-cols-3 gap-4">
	{#each menuItems as item}
		<div class="bg-white shadow-lg rounded-lg flex flex-col items-center py-4"> 
			<div class="text-lg">{item.name}</div>
		</div>
	{/each}
</div>
