import fs from "fs"
import babel from '@rollup/plugin-babel';
import path from 'path';
import copy from 'rollup-plugin-copy';
import upperCamelCase from 'uppercamelcase'

const resolveFile = function(filePath) {
  return path.join(__dirname, '..', filePath)
}

const rootDir = path.join(__dirname, '..')
const iconList = fs.readdirSync(path.join(rootDir, 'src/icons')).filter(item => item.endsWith('.js'))

const ioMapper = function(item) {
  const { output = {} , plugins = []} = item
  return {
    ...item,
    output: {
      format: 'cjs',
      ...output,
    },
    external: ['react', 'prop-types'],
    plugins: [
      ...plugins,
      babel({
        exclude: 'node_modules/**',
      })
    ]
  }
}

const ioList = [
  {
    input: 'src/icons.js',
    output: {
      file: 'dist/index.js',
    },
    plugins: [
      copy({
        targets: [
          { src: resolveFile('src/icons.d.ts'), dest: resolveFile('dist/') }
        ]
      }),
    ],
  }
]


iconList.forEach(icon => {
  ioList.push({
    input: `src/icons/${icon}`,
    output: {
      file: upperCamelCase(icon.replace(".js", "")) + '.js',
    },
  })
})

export default ioList.map(ioMapper);
