import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	optimizeDeps: {
		includes: ['just-debounce', 'three.js', '@pixi'],
	},
};

export default config;
