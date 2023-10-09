/* export default function({ store, redirect }) {
  const isLoggedIn = store.state.auth.loggedIn;
  const isAdmin = store.state.auth.user.admin;

  if (isLoggedIn && !isAdmin) {
    // return redirect('/')
    return redirect("/notAuthorized");
  }
} */

import { useMainStore } from '@/store'

export default defineNuxtRouteMiddleware((to, from) => {
  const { auth } = useMainStore()

  const isLoggedIn = auth.loggedIn
  const isAdmin = auth.user.admin

  if(isLoggedIn && isAdmin) {
    return navigateTo('/notAuthorized')
  }
})
