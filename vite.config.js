import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mdx from '@mdx-js/rollup'
import tailwindcss from '@tailwindcss/vite'
import remarkGfm from 'remark-gfm'
import rehypeShiki from '@shikijs/rehype'
import { viteSingleFile } from 'vite-plugin-singlefile'

// Odczytuje atrybuty z linii otwierającej blok kodu, np. ```java title="Main.java" check="body"
function parseMeta(meta) {
  const out = {}
  for (const m of (meta || '').matchAll(/(\w+)="([^"]*)"/g)) out[m[1]] = m[2]
  return out
}

const single = process.env.SINGLE === '1'

export default defineConfig({
  base: './',
  plugins: [
    {
      enforce: 'pre',
      ...mdx({
        providerImportSource: '@mdx-js/react',
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          [
            rehypeShiki,
            {
              themes: { light: 'github-light', dark: 'github-dark' },
              defaultColor: false,
              langs: ['java', 'xml', 'kotlin', 'csharp', 'jsx', 'javascript', 'html', 'css', 'bash', 'json', 'text'],
              parseMetaString: parseMeta,
              transformers: [
                {
                  name: 'inf04-meta',
                  pre(node) {
                    const meta = this.options.meta || {}
                    if (meta.title) node.properties['data-title'] = meta.title
                    node.properties['data-lang'] = this.options.lang
                  },
                },
              ],
            },
          ],
        ],
      }),
    },
    react({ include: /\.(jsx|js|mdx)$/ }),
    tailwindcss(),
    single && viteSingleFile(),
  ].filter(Boolean),
})
