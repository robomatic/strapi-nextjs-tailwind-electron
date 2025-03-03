const strapi = require('@strapi/strapi')

process.chdir(__dirname)
const app = strapi.createStrapi({
  distDir: 'dist',
})
app.start()
