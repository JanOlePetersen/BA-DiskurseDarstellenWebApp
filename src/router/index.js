import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProjectView from '../views/ProjectView.vue'
import Impressum from "@/views/impressum.vue";
import Datenschutz from "@/views/datenschutz.vue";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL), //!TODO check if reload of page works on server
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/project/:id',
      name: 'ProjectView',
      component: ProjectView,
      props: true
    },
    {
      path: '/impressum',
      name: 'Impressum',
      component: Impressum
    },
    {
      path: '/datenschutz',
      name: 'Datenschutz',
      component: Datenschutz
    },
    //redirect error 404
    {
      path: '/:catchAll(.*)',
      redirect: '/'
    }
  ]
})

export default router
