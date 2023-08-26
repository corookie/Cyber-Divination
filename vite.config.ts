
import vue from '@vitejs/plugin-vue'
// vite.config.ts
import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  server :{
    port:8080
  },
  // ...
  css: {
    preprocessorOptions: {
      less: {
        additionalData: `@import "element-plus/theme-chalk/index.css";`
      }
    }
  },
  plugins: [
    vue(),
    // ...
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
})