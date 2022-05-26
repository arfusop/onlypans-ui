import Link from 'next/link'

import styles from './Nav.module.scss'

const Nav = () => {
    return (
        <nav className={styles.NavBar}>
            <div>Logo goes here</div>
            <div>
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
