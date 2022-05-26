import { useState } from 'react'
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

import styles from './AuthPages.module.scss'

const Login = () => {
    const router = useRouter()

    const [showPassword, setShowPassword] = useState(false)
    const [rememberMe, setRememberMe] = useState(false)

    const onRegisterClick = () => router.push('/register')

    return (
        <section className={styles.AuthPage}>
            <form>
                <h1>
                    Welcome back to{' '}
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
                        Login
                    </Button>
                    <Button
                        variant="outlined"
                        size="large"
                        onClick={onRegisterClick}>
                        Register Now
                    </Button>
                </div>
                <p>Terms & Agreements go here...</p>
            </form>
        </section>
    )
}

export default Login
