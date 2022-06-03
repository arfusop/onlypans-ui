import { useSelector } from 'react-redux'

import Nav from './Nav'
import AuthNav from './AuthNav'

const NavBar = () => {
    const user = useSelector((state: any) => state.user)
    if (!user?.loggedIn) {
        return <Nav />
    }

    return <AuthNav />
}

export default NavBar
