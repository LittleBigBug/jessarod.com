import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	optimizeDeps: {
		includes: ['just-debounce', 'three.js', '@pixi', '@vime/core', '@vime/svelte'],
	},
	server: {
		watch: {
			usePolling: true,
		},
		fs: {
			allow: [ 'static' ],
		},
	},
};

export default config;
