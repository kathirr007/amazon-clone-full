export default function({ store, redirect }) {
  const isAuth = store.getters["isAuthenticated"];

  if (!isAuth) {
    // return redirect('/')
    return redirect("/login");
  }
}
