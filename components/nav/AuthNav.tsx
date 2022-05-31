import Link from 'next/link'

import Logo from '../logo'

const AuthNav = () => {
    return (
        <nav>
            <Logo location="home" />
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

export default AuthNav
