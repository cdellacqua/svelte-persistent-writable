import typescript from '@rollup/plugin-typescript';
import pkg from './package.json';

const name = pkg.name
	.replace(/^(@\S+\/)?(svelte-)?(\S+)/, '$3')
	.replace(/^\w/, m => m.toUpperCase())
	.replace(/-\w/g, m => m[1].toUpperCase());

const external = [...Object.keys(pkg.devDependencies || {}), ...Object.keys(pkg.peerDependencies || {}), ...Object.keys(pkg.dependencies || {})];

export default [
	{
		input: 'src/index.ts',
		external,
		plugins: [
			typescript()
		],
		output: [
			{ file: pkg.main, format: 'cjs' },
			{ file: pkg.module, format: 'es' }
		]
	}
];
