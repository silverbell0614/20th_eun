import { copyFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const REPO_NAME = '20th_eun'
const SITE_URL = `https://silverbell0614.github.io/${REPO_NAME}`

function siteUrlPlugin() {
  return {
    name: 'site-url',
    transformIndexHtml(html) {
      return html.replaceAll('__SITE_URL__', SITE_URL)
    },
  }
}

function spaFallbackPlugin() {
  let outDir

  return {
    name: 'spa-fallback-404',
    apply: 'build',
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir)
    },
    closeBundle() {
      copyFileSync(resolve(outDir, 'index.html'), resolve(outDir, '404.html'))
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => ({
  base: command === 'build' ? `/${REPO_NAME}/` : '/',
  plugins: [react(), tailwindcss(), siteUrlPlugin(), spaFallbackPlugin()],
  build: {
    outDir: mode === 'production' ? 'dist' : `dist-${mode}`,
  },
}))
