import NavBar from '../nav'

import styles from './Layout.module.scss'

const PageWrapper = ({ children }: { children: any }) => {
    return (
        <section className={styles.PageWrapper}>
            <NavBar />
            <div>{children}</div>
        </section>
    )
}

export default PageWrapper
