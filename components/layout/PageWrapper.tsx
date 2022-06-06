import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'

import NavBar from '../nav'
import { refreshUser } from '../../lib/redux/userSlice'
import { decodeToken } from '../../utilities/token'
import { LOGGED_IN_PAGES } from '../../utilities/constants'
import styles from './Layout.module.scss'

const PageWrapper = ({ children }: { children: any }) => {
    const router = useRouter()
    const dispatch = useDispatch()
    const user = useSelector((state: any) => state.user)

    useEffect(() => {
        if (!user.loggedIn) {
            const token = decodeToken()
            if (token?.id) {
                dispatch(refreshUser(token))
            } else {
                const basePathname = router.pathname.split('/')[1]
                const redirectToHome = LOGGED_IN_PAGES.includes(basePathname)
                if (redirectToHome) {
                    router.push('/')
                }
            }
        }
    }, [router])

    return (
        <section className={styles.PageWrapper}>
            <NavBar />
            <div>{children}</div>
        </section>
    )
}

export default PageWrapper
