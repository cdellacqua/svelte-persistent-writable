<script>
	import { localStorageAdapter, persistentWritable } from "../";

	const example = persistentWritable({ hello: "world!" }, {
		storage: localStorageAdapter("example"),
	});

	setInterval(() => {
		$example = {
			hello: $example.hello === "world!" ? "reactivity!" : "world!",
		};
	}, 1000);
</script>

<h1>Hello, {$example.hello}</h1>

<p>Have a look at your local storage, you should see the stored value changing with the text</p>

<style>
	:global(body) {
		font-family: sans-serif;
	}
</style>
