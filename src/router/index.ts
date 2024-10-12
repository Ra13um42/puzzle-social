import { createRouter, createWebHistory } from 'vue-router'
import { pageTransition } from '../modules/transition.module'
import useAuth from '../service/auth'
import useApp from '../service/app'
import HomeView from '../views/HomeView.vue'
import SignupView from '../views/SignupView.vue'
import LoginView from '../views/LoginView.vue'
import UsersView from '../views/UsersView.vue'
import EventsView from '../views/EventsView.vue'
import LocationsView from '../views/LocationsView.vue'
import UserView from '../views/UserView.vue'
import TermsView from '../views/TermsView.vue'
import PrivacyView from '../views/PrivacyView.vue'

const { loggedin, authChecked, doCheckAuth } = useAuth()
const { hideMobileMenu } = useApp()

export const routes = [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/users',
      name: 'users',
      component: UsersView
    },
    {
      path: '/events',
      name: 'events',
      component: EventsView
    },
    {
      path: '/locations',
      name: 'locations',
      component: LocationsView
    },
    {
      path: '/user/:id?',
      name: 'user',
      component: UserView
    },
    {
      path: '/terms',
      name: 'terms',
      component: TermsView
    },
    {
      path: '/privacy',
      name: 'privacy',
      component: PrivacyView
    },
  ]

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
