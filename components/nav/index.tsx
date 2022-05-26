import Nav from './Nav'
import AuthNav from './AuthNav'

const NavBar = () => {
    const user = null

    if (!user) {
        return <Nav />
    }

    return <AuthNav />
}

export default NavBar
