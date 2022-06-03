import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {
    TextField,
    InputAdornment,
    IconButton,
    Checkbox,
    FormControlLabel
} from '@mui/material'
import { useDispatch } from 'react-redux'
import { AccountCircle, Visibility, VisibilityOff } from '@mui/icons-material'
import { useMutation } from '@apollo/client'

import ButtonWithLoader from './ButtonWithLoader'
import useFormValidation from './utils/hooks/useFormValidation'
import { LOGIN_USER } from '../../lib/graphql/mutations/user'
import { VALID_PASSWORD, VALID_EMAIL } from '../../utilities/regex'

import { refreshUser } from '../../lib/redux/userSlice'
import { showBanner } from '../../lib/redux/bannerSlice'

import { JWT_SECRET } from '../../utilities/constants'
import styles from './AuthPages.module.scss'
import Logo from '../logo'

type formValueTypes = {
    value: string
    error: string
}

const Login = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const { disabled, onValidation } = useFormValidation()

    const [email, setEmail] = useState<formValueTypes>({ value: '', error: '' })
    const [password, setPassword] = useState<formValueTypes>({
        value: '',
        error: ''
    })
    const [loading, setLoading] = useState<boolean>(false)
    const [showPassword, setShowPassword] = useState<boolean>(false)
    // TODO: Remember me logic
    const [rememberMe, setRememberMe] = useState<boolean>(false)

    const onFieldUpdate = (e: any) => {
        const { name, value } = e.target
        switch (name) {
            case 'email':
                const newEmailValue = {
                    value,
                    error: VALID_EMAIL.test(value)
                        ? ''
                        : 'Please enter a valid email'
                }
                setEmail(newEmailValue)
                onValidation([newEmailValue, password])
                break
            case 'password':
                const newPasswordValue = {
                    value,
                    error: VALID_PASSWORD.test(value)
                        ? ''
                        : 'Please enter a password with at least 8 alpha-numeric digits, 1 capital letter, 1 number, and 1 special character'
                }
                setPassword(newPasswordValue)
                onValidation([email, newPasswordValue])
                break
            default:
                break
        }
    }

    const [handleLogin] = useMutation(LOGIN_USER, {
        onCompleted({ login: data }) {
            localStorage.setItem(JWT_SECRET, data.token)
            setLoading(false)
            dispatch(refreshUser(data))
            router.push('/dashboard')
        },
        onError(err: any) {
            setLoading(false)
            dispatch(showBanner({ status: 'error', message: err.message }))
        },
        variables: {
            email: email.value,
            password: password.value
        }
    })

    const onSubmit = () => {
        setLoading(true)
        handleLogin()
    }

    return (
        <section className={styles.AuthPage}>
            <Logo location="auth" />
            <form>
                <h1>Login</h1>
                <TextField
                    label="Email"
                    name="email"
                    value={email.value}
                    error={!!email.error}
                    helperText={email.error}
                    onChange={onFieldUpdate}
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
                    name="password"
                    error={!!password.error}
                    helperText={password.error}
                    value={password.value}
                    onChange={onFieldUpdate}
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
                <ButtonWithLoader
                    disabled={disabled}
                    text="Login"
                    loading={loading}
                    onSubmit={onSubmit}
                />
                <div className={styles.additionalInfo}>
                    <span>
                        New to OnlyPans?{' '}
                        <span className={styles.authLink}>
                            <Link href="/register" passHref>
                                Sign Up Now
                            </Link>
                        </span>
                    </span>
                    <span>Terms & Agreements go here...</span>
                </div>
            </form>
        </section>
    )
}

export default Login
