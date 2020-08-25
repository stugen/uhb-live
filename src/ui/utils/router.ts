import VueRouter, { RouteConfig } from 'vue-router'
import StreamView from '../components/pages/StreamView.vue'
import ChatOnlyView from '../components/pages/ChatOnlyView.vue'
import VideoView from '../components/pages/VideoView.vue'
import NotFound from '../components/pages/NotFound.vue'
import LoginWaitView from '../components/pages/LoginWaitView.vue'
import AdminView from '../components/pages/AdminView.vue'
import StartView from '../components/pages/StartView.vue'

const routes: RouteConfig[] = [
  {
    path: '/',
    component: StartView
  },
  {
    path: '/stream/:streamname',
    component: StreamView
  },
  {
    path: '/chat/:streamname',
    component: ChatOnlyView
  },
  {
    path: '/video/:streamname',
    component: VideoView
  },
  {
    path: '/login',
    component: LoginWaitView
  },
  {
    path: '/admin',
    component: AdminView
  },
  {
    path: '*',
    component: NotFound
  }
]

export const router = new VueRouter({
  routes,
  mode: 'history'
})
