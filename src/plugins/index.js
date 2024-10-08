/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import Notifications from '@kyvg/vue3-notification'
import vuetify from './vuetify'
import pinia from '@/stores'
import router from '@/router'
import store from '@/stores/vuex'

export function registerPlugins (app) {
  
  app
  .use(Notifications)
  .use(vuetify)
  .use(router)
  .use(store)
  app.config.globalProperties.$store=store;
}
