import styles from './Card.module.scss'

const index = ({ children }: { children: any }) => {
    return <div className={styles.CardBody}>{children}</div>
}

export default index
