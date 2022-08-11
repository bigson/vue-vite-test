import { fileURLToPath, URL } from 'node:url'
const path               = require('path')

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

console.log(head, style, import.meta, path.resolve(__dirname, "src/views/abc.head.scss"))

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    // lib:{
    //   head : {
    //     entry : path.resolve(__dirname, "src/views/abc.head.scss"),
    //     fileName : 'head_css'
    //   },
    //   style : {
    //     entry: path.resolve(__dirname, "src/views/abc.scss"),
    //     fileName : 'style_css'
    //   }
    // },
    rollupOptions: {
      input:{
        main: path.resolve(__dirname, 'index.html'),
        head_css: path.resolve(__dirname, "src/views/abc.head.scss"),
        style_css: path.resolve(__dirname, "src/views/abc.scss"),
      }
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "@/views/_variables.scss";
        `
      }
    }
  }
})
