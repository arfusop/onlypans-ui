import Link from 'next/link'
import { Fastfood } from '@mui/icons-material'

import styles from './Logo.module.scss'

type Locations = {
    location: 'auth' | 'home'
}

const Logo = ({ location }: Locations) => {
    return (
        <div
            className={`${styles.Logo} ${
                location === 'auth' ? styles.authLogo : styles.regularLogo
            }`}>
            <Link href="/" passHref>
                <Fastfood />
            </Link>
        </div>
    )
}

export default Logo
