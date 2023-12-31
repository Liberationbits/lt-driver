import type NDK from '@nostr-dev-kit/ndk';
import { NDKNip07Signer, NDKNip46Signer, NDKPrivateKeySigner, NDKUser } from '@nostr-dev-kit/ndk';

export type LoginMethod = 'none' | 'pk' | 'nip07' | 'nip46';
export enum LocalStorageKeys {
	NostrKey = 'nostr-key',
	NostrKeyMethod = 'nostr-key-method',
	NostrTargetNpub = 'nostr-target-npub',
	NostrLogin = 'nostr-login',
	NostrNsecbunkerKey = 'nostr-nsecbunker-key',
	CurrentUserNpub = 'currentUserNpub'
}

/**
 * This function attempts to sign in using whatever method was previously
 * used, or a NIP-07 extension.
 */
export async function login(
	ndk: NDK,
	bunkerNDK?: NDK,
	method?: LoginMethod
): Promise<NDKUser | null> {
	// Check if there is a localStorage item with the key "nostr-key-method"
	const nostrKeyMethod = method || localStorage.getItem(LocalStorageKeys.NostrKeyMethod);

	switch (nostrKeyMethod) {
		case 'none':
			return null;
		case 'pk': {
			const key = localStorage.getItem(LocalStorageKeys.NostrKey);

			if (!key) return null;

			const signer = new NDKPrivateKeySigner(key);
			ndk.signer = signer;
			const user = await signer.user();
			if (user) user.ndk = ndk;
			return user;
		}
		case 'nip07':
			return nip07SignIn(ndk);
		case 'nip46': {
			const promise = new Promise<NDKUser | null>((resolve, reject) => {
				try {
					const existingPrivateKey = localStorage.getItem(LocalStorageKeys.NostrNsecbunkerKey);

					if (!bunkerNDK) bunkerNDK = ndk;

					if (existingPrivateKey) {
						bunkerNDK.connect(2500);
						bunkerNDK.pool.on('relay:connect', async () => {
							const user = await nip46SignIn(ndk, bunkerNDK!, existingPrivateKey);
							resolve(user);
						});
					}
				} catch (error) {
					console.error('Error trying to login with NIP-46 (nsec bunker)' + error);
					reject(error);
				}
			});

			return promise;
		}
		default: {
			const promise = new Promise<NDKUser | null>((resolve, reject) => {
				// Attempt to see window.nostr a few times, there is a race condition
				// since the page might begin rendering before the nostr extension is loaded
				let loadAttempts = 0;
				try {
					const loadNip07Interval = setInterval(() => {
						if (window.nostr) {
							clearInterval(loadNip07Interval);
							const user = nip07SignIn(ndk);
							resolve(user);
						}

						if (loadAttempts++ > 10) {
							clearInterval(loadNip07Interval);
							const error = 'Giving up after many attempts to find NIP-07 login';
							console.error(error);
							reject(error);
						}
					}, 100);
				} catch (error) {
					console.error(error);
					reject(error);
				}
			});

			return promise;
		}
	}
}

/**
 * This function attempts to sign in using a NIP-07 extension.
 */
async function nip07SignIn(ndk: NDK): Promise<NDKUser | null> {
	const storedNpub = localStorage.getItem(LocalStorageKeys.CurrentUserNpub);
	let user: NDKUser | null = null;

	if (storedNpub) {
		user = new NDKUser({ npub: storedNpub });
		user.ndk = ndk;
	}

	if (window.nostr) {
		try {
			ndk.signer = new NDKNip07Signer();
			user = await ndk.signer.user();
			user.ndk = ndk;
			localStorage.setItem(LocalStorageKeys.CurrentUserNpub, user.npub);
		} catch (e) {
			console.error('Error while doing NIP-07 login:' + e);
		}
	}

	return user;
}

/**
 * This function attempts to sign in using a NIP-46 extension.
 */
async function nip46SignIn(
	ndk: NDK,
	bunkerNDK: NDK,
	existingPrivateKey: string
): Promise<NDKUser | null> {
	const npub = localStorage.getItem(LocalStorageKeys.NostrTargetNpub)!;
	const remoteUser = new NDKUser({ npub });
	let user: NDKUser | null = null;
	remoteUser.ndk = bunkerNDK;

	// check if there is a private key stored in localStorage
	let localSigner: NDKPrivateKeySigner | undefined = undefined;

	if (existingPrivateKey) {
		localSigner = new NDKPrivateKeySigner(existingPrivateKey);
	}

	const remoteSigner = new NDKNip46Signer(bunkerNDK, remoteUser.pubkey, localSigner);

	await remoteSigner.blockUntilReady();
	ndk.signer = remoteSigner;
	user = remoteUser;
	user.ndk = ndk;

	return user;
}
