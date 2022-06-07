import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import NavBar from '../nav'
import { refreshUser } from '../../lib/redux/userSlice'
import { decodeToken } from '../../utilities/token'
import styles from './Layout.module.scss'

const PageWrapper = ({ children }: { children: any }) => {
    const dispatch = useDispatch()
    const user = useSelector((state: any) => state.user)

    useEffect(() => {
        if (!user.loggedIn) {
            const token = decodeToken()
            if (token?.id) {
                dispatch(refreshUser(token))
            }
        }
    }, [])

    return (
        <section className={styles.PageWrapper}>
            <NavBar />
            <div>{children}</div>
        </section>
    )
}

export default PageWrapper
