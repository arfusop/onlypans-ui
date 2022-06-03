import Link from 'next/link'
import { Dashboard, Logout } from '@mui/icons-material'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'

import { JWT_SECRET } from '../../utilities/constants'
import { logout } from '../../lib/redux/userSlice'
import ThemeSwitch from './ThemeSwitch'
import Logo from '../logo'
import styles from './Nav.module.scss'

const AuthNav = () => {
    const router = useRouter()
    const dispatch = useDispatch()

    const onLogoutClick = () => {
        localStorage.removeItem(JWT_SECRET)
        dispatch(logout())
        router.push('/')
    }

    return (
        <nav className={styles.NavBar}>
            <Logo location="home" />
            <div className={styles.navItems}>
                <ThemeSwitch />
                <Link href="/dashboard" passHref>
                    <Dashboard />
                </Link>
                <Logout onClick={onLogoutClick} />
            </div>
        </nav>
    )
}

export default AuthNav
