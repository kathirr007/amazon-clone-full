export default function({ store, redirect }) {
  const isAuth = store.state.auth.loggedIn;

  if (!isAuth) {
    // return redirect('/')
    return redirect("/login");
  }
}
