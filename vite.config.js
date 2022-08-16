import { fileURLToPath, URL } from 'node:url'
const path               = require('path')

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import glob from 'glob'
const fs = require('fs')

var all = glob.sync('./src/**/*.scss'),
    style = [],
    head = []

all.forEach(function(e, i){
    console.log(e)
    if(e.match((/.*\.head\.scss/))){
        head.push(path.resolve(__dirname, e))
    }else{
        style.push(path.resolve(__dirname, e))
    }
})

const htmlPlugin = () => {
  return {
    name: 'html-transform',
    transformIndexHtml: async function(html, context){
      console.log(html, context, process.argv)
      // let css = await fs.readFile(path.resolve(__dirname, 'dist/assets/'), 'utf8')

      html = html.replace(
          /<title>(.*?)<\/title>/,
          `<title>bigson</title>`)

      return html
    }
  }
}

console.log(head, style, import.meta, path.resolve(__dirname, "src/views/abc.head.scss"))

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), htmlPlugin ()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    manifest: true,
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
        head_css: head,
        style_css: style,
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
  },
})
