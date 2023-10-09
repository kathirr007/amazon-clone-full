/* export default function({ store, redirect }) {
  const isAuth = store.state.auth.loggedIn;

  if (!isAuth) {
    // return redirect('/')
    return redirect("/login");
  }
} */

import { useMainStore } from '@/store'

export default defineNuxtRouteMiddleware((to, from) => {
  const { auth } = useMainStore()
  if (!auth.loggedIn) {
    return navigateTo('/login')
  }
})
