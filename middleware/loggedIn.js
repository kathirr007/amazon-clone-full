/* export default function({ store, redirect }) {
  const isAuth = store.state.auth.loggedIn;

  if (!isAuth) {
    // return redirect('/')
    return redirect("/login");
  }
} */

export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useState('auth')
  const isLoggedIn = auth.value.loggedIn;
  if (!isLoggedIn) {
    return navigateTo('/login')
  }
})
