import { createRouter, createWebHistory } from 'vue-router'
import { pageTransition } from '../modules/transition.module'
import useAuth from '../service/auth'
import useApp from '../service/app'
import { routes } from './routes'

const { loggedin, authChecked, doCheckAuth } = useAuth()
const { hideMobileMenu } = useApp()

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
  async scrollBehavior(to, from, savedPosition) {
    await pageTransition()
    return new Promise((resolve, reject) => {
    if (savedPosition) {
      return resolve(savedPosition)
    } else {
      return resolve({ left: 0, top: 0 })
    }
    })
  },
})

router.beforeEach(async (to, from, next) => {
  if (!authChecked.value) {
    await doCheckAuth()
  }
  if (to.meta.requiresAuth && !loggedin.value) {
    next({ name: 'login', query: { redirect: to.path }  })
  } else if ((to.name == 'login') && loggedin.value) {
    next({ name: 'user' })
  } else {
    next()
  }
})

router.afterEach(async (to, from, next) => {
  hideMobileMenu()
})

export default router
