import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// yarn add --dev @esbuild-plugins/node-globals-polyfill
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
// yarn add --dev @esbuild-plugins/node-modules-polyfill
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill'
// You don't need to add this to deps, it's included by @esbuild-plugins/node-modules-polyfill
import rollupNodePolyFill from 'rollup-plugin-node-polyfills'

//http://blog.shengchao.top/article/21
//https://medium.com/@ftaioli/using-node-js-builtin-modules-with-vite-6194737c2cd2

// https://vitejs.dev/config/
export default defineConfig({
  resolve:{
    "alias":{
      process: "process/browser",
      stream: "stream-browserify",
      zlib: "browserify-zlib",
      util: 'util'
    }
  },
  optimizeDeps: {
    esbuildOptions: {
        // Node.js global to browser globalThis
        define: {
            global: 'globalThis'
        },
        // Enable esbuild polyfill plugins
        plugins: [
            NodeGlobalsPolyfillPlugin({
                process: true,
                buffer: true
            }),
            NodeModulesPolyfillPlugin()
        ]
    }
},
build: {
  rollupOptions: {
      plugins: [
          // Enable rollup polyfills plugin
          // used during production bundling
          rollupNodePolyFill()
      ]
  }
},
  plugins: [react()],
})
