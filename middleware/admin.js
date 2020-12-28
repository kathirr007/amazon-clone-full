export default function({ store, redirect }) {
  const isAdmin = store.getters["isAdmin"];

  if (!isAdmin) {
    // return redirect('/')
    return redirect("/");
  }
}
