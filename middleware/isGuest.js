/* export default function({store, redirect}) {
    const isAuth = !!store.state.auth.user
    const isLoggedIn = store.state.auth.loggedIn

    if(isAuth || isLoggedIn) {
        // navigate later to notAuthorized page
        return redirect('/')
    }
}
 */

export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useState('auth')
  const isAuth = !!auth.value.auth.user;
  const isLoggedIn = auth.value.loggedIn;
  if (isAuth || isLoggedIn) {
    return navigateTo('/')
  }
})
