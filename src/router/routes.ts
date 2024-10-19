import HomeView from '../views/HomeView.vue'
import SignupView from '../views/SignupView.vue'
import LoginView from '../views/LoginView.vue'
import PeopleView from '../views/pages/PeopleView.vue'
import EventsView from '../views/pages/EventsView.vue'
import LocationsView from '../views/pages/LocationsView.vue'
import UserView from '../views/UserView.vue'
import TermsView from '../views/other/TermsView.vue'
import PrivacyView from '../views/other/PrivacyView.vue'
import TikTokRedirectView from '../views/other/TikTokRedirectView.vue'
import SettingsView from '../views/SettingsView.vue'


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
      path: '/people',
      name: 'people',
      component: PeopleView
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
    {
      path: '/auth/callback',
      name: 'tiktok_redirect',
      component: TikTokRedirectView
    },
    {
      path: '/settings',
      name: 'settings',
      meta: { requiresAuth: true },
      component: SettingsView
    },
  ]