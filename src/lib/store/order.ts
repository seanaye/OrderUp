import { produce } from 'immer';
import type { Order, Item } from '$lib/types/index';
import { v4 } from 'uuid';
import { writable } from 'svelte/store';

export const makeAll = () => {
	console.log('make all')
	const jsString = localStorage.getItem('orders');
	const ids = jsString ? JSON.parse(jsString) : [];
	return ids.reduce((acc, cur) => {
		try {
			const order = makeOrder(cur);
			return [...acc, order];
		} catch (e) {
			console.error(e);
			return acc;
		}
	}, []);
};

export const makeOrder = (oldId?: string) => {
	const id = v4();
	const { set, subscribe, update } = writable<Order>({
		id,
		name: '',
		items: [],
		complete: false
	});

	console.log({ oldId });
	if (oldId) {
		const jsStr = window.localStorage.getItem(oldId);
		if (jsStr) {
			set(JSON.parse(jsStr));
		} else {
			// catch oldId not found in localStorage
			throw new Error('Order ID not found in storage');
		}
	} else {
		// this is a new order write to list of orders
		const fromStorage = localStorage.getItem('orders');
		const curOrders: Array<string> = fromStorage ? JSON.parse(fromStorage) : [];
		curOrders.push(id);
		localStorage.setItem('orders', JSON.stringify(curOrders));
	}

	subscribe((val) => {
		console.log({ val });
		localStorage.setItem(val.id, JSON.stringify(val));
	});

	return {
		subscribe,
		add: (item: Item, count: number) => {
			update((current) => {
				const thisItem = current.items.findIndex((elem) => elem.id === item.id);
				if (thisItem !== -1) {
					return produce(current, (draft) => {
						const newCount = draft.items[thisItem].count + count
						if (newCount < 1) {
							draft.items.splice(thisItem, 1)
						} else {
							draft.items[thisItem].count += count;
						}
					});
				}
				return produce(current, (draft) => {
					const toAdd = Object.assign(item, { count });
					console.log({ toAdd });
					draft.items.push(toAdd);
				});
			});
		},
		set,
	};
};

export function getTotal(order: Order) {
  const subtotal = order.items.reduce((acc, cur) => {
		return acc + cur.count * cur.price;
	}, 0);
	const total = Math.ceil(subtotal * 1.13)
	return { total, subtotal }
}

export function renderPrice(price: number) {
	const dollars = price / 100;
	return dollars.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}
