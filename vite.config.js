import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import glob from 'glob'

var all = glob.sync('./src/**/*.scss'),
    style = [],
    head = []

all.forEach(function(e, i){
    console.log(e)
    if(e.match((/.*\.head\.scss/))){
        head.push(e)
    }else{
        style.push(e)
    }
})

console.log(head, style, import.meta)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "@/views/_variables.scss";
          @import "@/views/abc.head.scss";
        `
      }
    }
  }
})
