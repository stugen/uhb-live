import Vue, { VNode } from 'vue'
import VueRouter from 'vue-router'
import { Datetime } from 'vue-datetime'
import App from './components/App.vue'
import { router } from './utils/router'
import { store } from './utils/store'
import { i18n } from './utils/i18n'
import { setClientId } from './utils/clientId'
import './utils/font-awesome'
import './utils/verifyAccessToken'
import 'vue-datetime/dist/vue-datetime.css'

Vue.use(VueRouter)
Vue.component('datetime', Datetime)

setClientId()

new Vue({
  render: (vueRender): VNode => vueRender(App),
  router,
  store,
  i18n
}).$mount('main')
