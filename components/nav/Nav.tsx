import Link from 'next/link'

import ThemeSwitch from './ThemeSwitch'
import Logo from '../logo'
import styles from './Nav.module.scss'

const Nav = () => {
    return (
        <nav className={styles.NavBar}>
            <Logo location="home" />
            <div className={styles.navItems}>
                <ThemeSwitch />
                <Link href="/register" passHref>
                    Register
                </Link>
                <Link href="/login" passHref>
                    Login
                </Link>
            </div>
        </nav>
    )
}

export default Nav
