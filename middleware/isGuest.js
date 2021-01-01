export default function({store, redirect}) {
    const isAuth = !!store.state.auth.user
    const isLoggedIn = store.state.auth.loggedIn

    if(isAuth || isLoggedIn) {
        // navigate later to notAuthorized page
        return redirect('/')
    }
}
