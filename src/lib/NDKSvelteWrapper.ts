import { NDKEvent, type NDKFilter, type NDKSubscriptionOptions } from '@nostr-dev-kit/ndk';
import type { NDKEventStore } from '@nostr-dev-kit/ndk-svelte';
import type NDKSvelte from '@nostr-dev-kit/ndk-svelte';

export class NDKSvelteWrapper {
	private ndk: NDKSvelte;
	private registeredStores: NDKEventStore<NDKEvent>[] = [];

	constructor(ndk: NDKSvelte) {
		this.ndk = ndk;
	}

	public async publish(e: NDKEvent): Promise<boolean> {
		return e
			.sign()
			.then((sig) => {
				this.registeredStores.forEach((store) => {
					const filterArr = Array.isArray(store.filters) ? store.filters : [store.filters];
					if (filterArr.some((filter) => true)) {
						store.update((es) => [e].concat(es));
					}
				});
			})
			.then(() => e.publish())
			.then((relays) => relays.size > 0);
	}

	public storeSubscribe(
		filters: NDKFilter<number> | NDKFilter<number>[],
		opts?: NDKSubscriptionOptions | undefined
	): NDKEventStore<NDKEvent> {
		const store = this.ndk.storeSubscribe(filters, opts);
		this.registeredStores.push(store);
		return store;
	}
}
