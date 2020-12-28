export default function({ store, redirect }) {
  const isAuth = store.getters["isAuthenticated"];
  const isLoggedIn = store.state.auth.loggedIn;

  if (isAuth || isLoggedIn) {
    // navigate later to notAuthorized page
    return redirect("/");
  }
}
