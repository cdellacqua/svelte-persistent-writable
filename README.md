# svelte-persistent-writable

A Svelte writable store that persists data. It supports local and session storage out-of-the-box and can easily be extended to target different storage mechanisms

## Full documentation:
* [PersistentWritable](https://github.com/cdellacqua/svelte-persistent-writable/blob/master/docs/README.md)

## Working demo:
* [App.svelte](https://github.com/cdellacqua/svelte-persistent-writable/blob/master/src/App.svelte)

You can clone this repo and run `npm run dev` to see it working

## Highlights

Create a writable store that persists its value using the localStorage
```javascript
const myWritable = persistentWritable(0, {
	storage: localStorageAdapter('myWritable')
});
```

Create a writable store that persists its value using the sessionStorage
```javascript
const myWritable = persistentWritable(0, {
	storage: sessionStorageAdapter('myWritable')
});
```


In a Svelte component, the created PersistentWritable can be used just like any other Writable store:

```svelte
Here is the value:
<div>{$myWritable}</div>
```
