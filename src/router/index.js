import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import AboutPage from '../views/AboutPage.vue'
import NotFound from '../views/NotFound.vue'
import DenemeDetails from '../views/DenemeDetails.vue'
import AddImages from '../views/AddImages.vue'

const routes = [
   {
      path: '/',
      name: 'HomePage',
      component: HomePage
   },
   {
      path: '/about',
      name: 'AboutPage',
      component: AboutPage
   },
   {
      path: '/add_images',
      name: 'AddImages',
      component: AddImages,
   },
   {
      path: '/deneme/:id',
      name: 'DenemeDetails',
      component: DenemeDetails,
   },
   {
      path: '/:catchAll(.*)',
      name: 'NotFound',
      component: NotFound
   },
]

const router = createRouter({
   history: createWebHashHistory(),
   routes
})
export default router