export default function({ store, redirect }) {
  const isLoggedIn = store.state.auth.loggedIn;
  const isAdmin = store.state.auth.user.admin;

  if (isLoggedIn && !isAdmin) {
    // return redirect('/')
    return redirect("/notAuthorized");
  }
}
