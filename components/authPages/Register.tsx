import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { TextField, InputAdornment, IconButton } from '@mui/material'
import { AccountCircle, Visibility, VisibilityOff } from '@mui/icons-material'
import { useMutation } from '@apollo/client'

import { REGISTER_USER } from '../../lib/graphql/mutations/user'
import ButtonWithLoader from './ButtonWithLoader'
import useFormValidation from './utils/hooks/useFormValidation'
import { VALID_PASSWORD, VALID_EMAIL } from '../../utilities/regex'
import { closeBanner, showBanner } from '../../lib/redux/bannerSlice'
import { register } from '../../lib/redux/userSlice'

import { JWT_SECRET } from '../../utilities/constants'
import styles from './AuthPages.module.scss'
import Logo from '../logo'

type formValueTypes = {
    value: string
    error: string
}

const Register = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const { disabled, onValidation } = useFormValidation()

    const [email, setEmail] = useState<formValueTypes>({ value: '', error: '' })
    const [password, setPassword] = useState<formValueTypes>({
        value: '',
        error: ''
    })
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

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

    const [handleRegister] = useMutation(REGISTER_USER, {
        onCompleted({ register: data }) {
            localStorage.setItem(JWT_SECRET, data.token)
            setLoading(false)
            dispatch(register(data))
            router.push('/account')
        },
        onError(err) {
            setLoading(false)
            dispatch(showBanner({ status: 'error', message: err.message }))
        },
        variables: {
            email: email.value,
            password: password.value
        }
    })

    const onSubmit = (e: any) => {
        e.preventDefault()
        setLoading(true)
        handleRegister()
    }

    return (
        <section className={styles.AuthPage}>
            <Logo location="auth" />
            <form onSubmit={onSubmit}>
                <h1>Sign Up</h1>
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
                <ButtonWithLoader
                    disabled={disabled}
                    loading={loading}
                    text="Register"
                />
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
