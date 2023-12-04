import { writable } from 'svelte/store';
import NDK from '@nostr-dev-kit/ndk';
import type { NDKCacheAdapter } from '@nostr-dev-kit/ndk';
import NDKDexieCacheAdapter from '@nostr-dev-kit/ndk-cache-dexie';
// import NDKRedisCacheAdapter from '@nostr-dev-kit/ndk-cache-redis';
import { browser } from '$app/environment';
import NDKSvelte from '@nostr-dev-kit/ndk-svelte';

let cacheAdapter: NDKCacheAdapter | undefined;

if (browser) {
	cacheAdapter = new NDKDexieCacheAdapter({
		dbName: 'lt-driver'
	});
} else {
	// cacheAdapter = new NDKRedisCacheAdapter();
	// console.log(`Using cache NDKRedisCacheAdapter`);
}

export const defaultRelays = [
	// 'ws://localhost:8080',
	'wss://nos.lol',
	'wss://relay.damus.io',
	'wss://relay.snort.social',
	'wss://nostr-pub.wellorder.net'
];

const _ndk: NDKSvelte = new NDKSvelte({
	explicitRelayUrls: defaultRelays,
	cacheAdapter
});

const ndk = writable(_ndk);

export default ndk;

console.log({ cacheAdapter: !!cacheAdapter });

const _bunkerNDK = new NDK({
	explicitRelayUrls: ['wss://relay.nsecbunker.com', 'wss://nostr.vulpem.com'],
	cacheAdapter
});

export const bunkerNDK = writable(_bunkerNDK);
