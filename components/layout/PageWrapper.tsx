import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { useLazyQuery } from '@apollo/client'

import NavBar from '../nav'
import { GET_LOGGED_IN_USER } from '../../lib/graphql/queries/user'
import { refreshUser } from '../../lib/redux/userSlice'
import { decodeToken } from '../../utilities/token'
import { LOGGED_IN_PAGES } from '../../utilities/constants'
import styles from './Layout.module.scss'

const PageWrapper = ({ children }: { children: any }) => {
    const router = useRouter()
    const dispatch = useDispatch()
    const user = useSelector((state: any) => state.user)

    const [getLoggedInUser] = useLazyQuery(GET_LOGGED_IN_USER, {
        onCompleted({ getLoggedInUser }) {
            dispatch(refreshUser(getLoggedInUser))
        },
        onError(err: any) {
            // banner
        }
    })

    useEffect(() => {
        if (!user.loggedIn) {
            const token = decodeToken()
            if (token?.id) {
                getLoggedInUser()
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
            <div className={styles.pageContent}>{children}</div>
            <footer>testing</footer>
        </section>
    )
}

export default PageWrapper
