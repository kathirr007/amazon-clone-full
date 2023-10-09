/* export default function({store, redirect}) {
    const isAuth = !!store.state.auth.user
    const isLoggedIn = store.state.auth.loggedIn

    if(isAuth || isLoggedIn) {
        // navigate later to notAuthorized page
        return redirect('/')
    }
} */

import { useMainStore } from '@/store'

export default defineNuxtRouteMiddleware((to, from) => {
  const { auth } = useMainStore()

  const isAuth = !!auth.user
  const isLoggedIn = auth.loggedIn

  if(isAuth || isLoggedIn) {
    return navigateTo('/')
  }
})
