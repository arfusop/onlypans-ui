import Link from 'next/link'

const AuthNav = () => {
    return (
        <nav>
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

export default AuthNav
