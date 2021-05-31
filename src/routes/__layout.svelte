<script lang="ts" context="module">
	export function load({ page: { path } }) {
		return {
			props: { path }
		};
	}

</script>

<script lang="ts">
	import '../app.postcss';
	import { makeOrder } from '$lib/store/order';
	import { setContext } from 'svelte';
	import OrderLayout from '$lib/components/OrderLayout.svelte';
	import { goto } from '$app/navigation';

	export let path: string;

	$: if (typeof window !== 'undefined' && path !== "/") {
		try {
			const order = makeOrder(path.substring(1));
			console.log({ order });
			setContext(path, order);
		} catch (e) {
			goto('/');
		}
	}

</script>

{#if path !== '/'}
	<OrderLayout {path}>
		<slot />
	</OrderLayout>
{:else}
	<slot />
{/if}
