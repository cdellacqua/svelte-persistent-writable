import { writable, Writable } from "svelte/store";

/**
 * A Writable store that can persist its content to a storage
 */
export interface PersistentWritable<T> extends Writable<T> {
	/**
	 * Removes the item from the storage. Note that the underling store value remains untouched
	 */
	remove: () => void;
}

/**
 * A single item storage that provides a set of common methods
 */
export interface ItemStorage<T> {
	/**
	 * Saves the passed value
	 */
	set: (value: T) => void;
	/**
	 * If the storage contains a value, it returns it wrapped as { value: ... }
	 * Otherwise it returns null
	 */
	get: () => { value: T } | null;
	/**
	 * Removes the value from the storage
	 */
	remove: () => void;
}

/**
 * An object providing a serialize and a deserialize method
 */
export interface StorageMapper<T, TSerialized> {
	/**
	 * Converts the passed value from T to TSerialized
	 */
	serialize: (value: T) => TSerialized,
	/**
	 * Converts the passed value from TSerialized to T
	 */
	deserialize: (serializedValue: TSerialized) => T,
}

/**
 * Generates an dummy ItemStorage that never sets anything and always returns { present: false }
 * @returns an ItemStorage
 */
export function dummyStorageAdapter<T>(): ItemStorage<T> {
	return {
		remove: () => {},
		get: () => null,
		set: () => {},
	};
}

/**
 * Generates an ItemStorage based on an implementation of the native Storage API
 * @param key key needed to access the record in the storage
 * @param nativeStorage localStorage, sessionStorage or any other implementation of the Storage API
 * @param mapper (optional) an object containing a serialize and deserialize function
 * @param mapper.serialize a function that converts T into a string
 * @param mapper.deserialize a function that converts a string into T
 * @returns an ItemStorage
 */
function nativeStorageAdapter<T>(
	key: string,
	nativeStorage: Storage,
	mapper?: StorageMapper<T, string>
): ItemStorage<T> {
	const { serialize, deserialize } = mapper || {
		serialize: (v) => {
			const stringified = JSON.stringify(v);
			if (stringified === undefined) {
				throw new Error("unable to serialize passed value");
			}
			return stringified;
		},
		deserialize: (v) => JSON.parse(v)
	};
	return {
		remove: () => nativeStorage.removeItem(key),
		get: () => {
			const nativeStorageValue = nativeStorage.getItem(key);
			if (nativeStorageValue === null) {
				return null;
			}
			return { value: deserialize(nativeStorageValue) };
		},
		set: (value) => {
			nativeStorage.setItem(key, serialize(value));
		},
	};
}

/**
 * Generates an ItemStorage based on the localStorage
 * @param key the key in the localStorage
 * @param mapper (optional) an object containing a serialize and deserialize function. Defaults to JSON.stringify and JSON.parse respectively
 * @param mapper.serialize a function that converts T into a string
 * @param mapper.deserialize a function that converts a string into T
 * @returns an ItemStorage
 */
export function localStorageAdapter<T>(key: string, mapper?: StorageMapper<T, string>): ItemStorage<T> {
	// SSR support
	if (typeof localStorage === "undefined") {
		return dummyStorageAdapter();
	}

	return nativeStorageAdapter(key, localStorage, mapper);
}

/**
 * Generates an ItemStorage based on the sessionStorage
 * @param key the key in the sessionStorage
 * @param mapper (optional) an object containing a serialize and deserialize function. Defaults to JSON.stringify and JSON.parse respectively
 * @param mapper.serialize a function that converts T into a string
 * @param mapper.deserialize a function that converts a string into T
 * @returns an ItemStorage
 */
export function sessionStorageAdapter<T>(key: string, mapper?: StorageMapper<T, string>): ItemStorage<T> {
	// SSR support
	if (typeof sessionStorage === "undefined") {
		return dummyStorageAdapter();
	}

	return nativeStorageAdapter(key, sessionStorage, mapper);
}

/**
 * Configuration object used to initialize the Persistent Writable
 */
export interface PersistentWritableConfig<T> {
	/** an ItemStorage */
	storage: ItemStorage<T>;
	/**
	 * (optional) a start function that will be called once the writable store has at least one subscriber and optionally returns a stop function that will be called
	 * once the store has no remaining subscribers
	 */
	start?: (set: (value: T) => void) => void | (() => void);
	/**
	 * (option, defaults to true) during initialization an Error can be thrown (e.g. when JSON.parse isn't capable of parsing a serialized value in the localStorage)
	 * 
	 * If true, the error will get caught and the store will be re-initialized as if it weren't ever persisted
	 * 
	 * Otherwise the error will be thrown
	 */
	resetOnInitFailure?: boolean;
}

/**
 * Creates a Persistent Writable. This Writable store will be initialized with initialValue if
 * the passed item storage doesn't contain any value, otherwise it will be initialized with the value
 * found in the item storage
 * @param initialValue the value the store will contain on its first initialization
 * @param config the configuration object
 * @param config.storage an ItemStorage implementation (e.g. localStorageAdapter(key) or sessionStorageAdapter(key))
 * @param config.start (optional) a start function that will be called once the writable store has at least one subscriber and optionally returns a stop function that will be called
 *                     once the store has no remaining subscribers
 * @param config.resetOnInitFailure (optional, defaults to true) during initialization an Error can be thrown (e.g. when JSON.parse isn't capable of parsing a serialized value in the localStorage)
 * 
 *                                  If true, the error will get caught and the store will be re-initialized as if it weren't ever persisted
 * 
 *                                  Otherwise the error will be thrown
 * @returns a persistent writable store
 */
export function persistentWritable<T>(
	initialValue: T,
	{ storage, start, resetOnInitFailure = true }: PersistentWritableConfig<T>
): PersistentWritable<T> {
	let initialOrExistingValue = initialValue;
	try {
		const option = storage.get();
		if (!option) {
			storage.set(initialValue);
		} else {
			initialOrExistingValue = option.value;
		}
	} catch (err) {
		if (resetOnInitFailure) {
			storage.set(initialValue);
		} else {
			throw err;
		}
	}
	const baseWritable = writable<T>(
		initialOrExistingValue,
		start &&
			((set) => {
				return start((value) => {
					storage.set(value);
					set(value);
				});
			})
	);

	return {
		remove: () => storage.remove(),
		set: (v) => {
			storage.set(v);
			return baseWritable.set(v);
		},
		update: (updater) => {
			return baseWritable.update((oldValue) => {
				const newValue = updater(oldValue);
				storage.set(newValue);
				return newValue;
			});
		},
		subscribe: (run, invalidate) => {
			return baseWritable.subscribe(run, invalidate);
		},
	};
}
