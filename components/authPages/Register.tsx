import { useState } from 'react'
import { useDispatch } from 'react-redux'
import Link from 'next/link'
import {
    TextField,
    InputAdornment,
    IconButton,
    Checkbox,
    FormControlLabel,
    Button
} from '@mui/material'
import {
    AccountCircle,
    Visibility,
    VisibilityOff,
    Fastfood
} from '@mui/icons-material'

import { closeBanner, showBanner } from '../../lib/redux/bannerSlice'
import styles from './AuthPages.module.scss'

const Register = () => {
    const dispatch = useDispatch()

    const [showPassword, setShowPassword] = useState(false)
    const [rememberMe, setRememberMe] = useState(false)

    return (
        <section className={styles.AuthPage}>
            <div className={styles.logo}>
                <Link href="/" passHref>
                    <Fastfood />
                </Link>
            </div>
            <form>
                <h1>Sign Up</h1>
                <TextField
                    label="Email"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    edge="end"
                                    className={styles.inputIcon}>
                                    <AccountCircle />
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
                <TextField
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    edge="end"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }>
                                    {showPassword ? (
                                        <VisibilityOff />
                                    ) : (
                                        <Visibility />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
                <Button variant="contained" size="large">
                    Register
                </Button>
                <div className={styles.additionalInfo}>
                    <span>
                        Already have an account?{' '}
                        <span className={styles.authLink}>
                            <Link href="/login" passHref>
                                Login Now
                            </Link>
                        </span>
                    </span>
                    <span>Terms & Agreements go here...</span>
                </div>
            </form>
        </section>
    )
}

export default Register
