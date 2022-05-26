import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {
    TextField,
    InputAdornment,
    IconButton,
    Checkbox,
    FormControlLabel,
    Button
} from '@mui/material'
import { AccountCircle, Visibility, VisibilityOff } from '@mui/icons-material'

import { closeBanner, showBanner } from '../../lib/redux/bannerSlice'
import styles from './AuthPages.module.scss'

const Register = () => {
    const router = useRouter()
    const dispatch = useDispatch()

    const [showPassword, setShowPassword] = useState(false)
    const [rememberMe, setRememberMe] = useState(false)

    const onLoginClick = () => router.push('/login')

    return (
        <section className={styles.AuthPage}>
            <form>
                <button
                    onClick={e => {
                        e.preventDefault()
                        dispatch(
                            showBanner({
                                status: 'success',
                                message: 'testing a message for a win'
                            })
                        )
                    }}>
                    TEST BANNER
                </button>
                <button
                    onClick={e => {
                        e.preventDefault()
                        dispatch(closeBanner())
                    }}>
                    CLOSE BANNER
                </button>
                <h1>
                    Welcome to{' '}
                    <Link href="/" passHref>
                        OnlyPans
                    </Link>
                </h1>
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
                <div className={styles.additionalLinks}>
                    <FormControlLabel
                        label="Remember Me"
                        control={
                            <Checkbox
                                checked={rememberMe}
                                onChange={() => setRememberMe(!rememberMe)}
                            />
                        }
                    />
                    <span className={styles.forgotPassword}>
                        <Link href="/forgot-password" passHref>
                            Forgot Password?
                        </Link>
                    </span>
                </div>
                <div className={styles.buttons}>
                    <Button variant="contained" size="large">
                        Register
                    </Button>
                    <Button
                        variant="outlined"
                        size="large"
                        onClick={onLoginClick}>
                        Login Now
                    </Button>
                </div>
                <p>Terms & Agreements go here...</p>
            </form>
        </section>
    )
}

export default Register
