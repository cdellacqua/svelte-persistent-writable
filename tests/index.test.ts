import { get } from 'svelte/store';
import { localStorageAdapter, persistentWritable } from "../src/index";

describe('factory functions', function () {
	it('creates a persistent writable store with a primitive value', () => {
		const value = 0;
		expect(get(persistentWritable(value, {
			storage: localStorageAdapter('key'),
		}))).toEqual(value);
	});
	it('creates a persistent writable store with an array containing an object and primitive values', () => {
		const value = [{ prop: 'hi' }, 2, "hello"];
		expect(get(persistentWritable(value, {
			storage: localStorageAdapter('key2'),
		}))).toEqual(value);
	});
	it('creates a persistent writable store with an incompatible value', () => {
		expect(() => persistentWritable(undefined, {
			storage: localStorageAdapter('key3'),
		})).toThrowError();
	});
	it('checks that values are persistent', () => {
		const value = [{ prop: 'hi' }, 2, "hello"];
		expect(get(persistentWritable(value, {
			storage: localStorageAdapter('key4'),
		}))).toEqual(value);
		expect(get(persistentWritable([], {
			storage: localStorageAdapter('key4'),
		}))).toEqual(value);
	});
	it('removes the item from the storage', () => {
		const value = [{ prop: 'hi' }, 2, "hello"];
		const writable = persistentWritable(value, {
			storage: localStorageAdapter('key5'),
		});
		expect(get(writable)).toEqual(value);
		writable.remove();
		const nextValue = [0];
		expect(get(persistentWritable(nextValue, {
			storage: localStorageAdapter('key5'),
		}))).toEqual(nextValue);
	});
});
