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
    path: '/c/:collection'
  },
  {
    path: '/v/:streamname',
    component: StreamView
  },
  {
    path: '/v/:streamname/chat',
    component: ChatOnlyView
  },
  {
    path: '/v/:streamname/video',
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
    path: '/admin/videos'
  },
  {
    path: '/admin/collections'
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
