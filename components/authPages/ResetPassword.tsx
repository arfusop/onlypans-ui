import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import {
    TextField,
    InputAdornment,
    IconButton,
    Alert,
    Button
} from '@mui/material'
import { Visibility, VisibilityOff, CheckCircle } from '@mui/icons-material'
import { useMutation } from '@apollo/client'

import { decodeResetPwToken } from '../../utilities/token'
import { showBanner } from '../../lib/redux/bannerSlice'
import { RESET_PASSWORD } from '../../lib/graphql/mutations/user'
import ButtonWithLoader from './ButtonWithLoader'
import { VALID_PASSWORD } from '../../utilities/regex'
import useFormValidation from './utils/hooks/useFormValidation'
import styles from './AuthPages.module.scss'
import Logo from '../logo'

type formValueTypes = {
    value: string
    error: string
}

type tokenTypes = {
    email: string
    password: string
}

const ResetPassword = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const { disabled, onValidation } = useFormValidation()

    const [password, setPassword] = useState<formValueTypes>({
        value: '',
        error: ''
    })
    const [confirmPassword, setConfirmPassword] = useState<formValueTypes>({
        value: '',
        error: ''
    })
    const [loading, setLoading] = useState(false)
    const [passwordsMatch, setPasswordsMatch] = useState<boolean>(true)
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [showConfirmPassword, setShowConfirmPassword] =
        useState<boolean>(false)
    const [token, setToken] = useState<tokenTypes>({ email: '', password: '' })
    const [resetSuccessful, setResetSuccessful] = useState<boolean>(false)

    useEffect(() => {
        if (router.query.token) {
            const decoded = decodeResetPwToken(router.query.token as string)

            if (!decoded.email ?? !decoded.password) {
                dispatch(
                    showBanner({
                        status: 'error',
                        message:
                            'This link expired. You will need to try requesting a password reset again.'
                    })
                )
            } else {
                setToken({ email: decoded.email, password: decoded.password })
            }
        }
    }, [router.query])

    const [resetPassword] = useMutation(RESET_PASSWORD, {
        onCompleted() {
            setLoading(false)
            setResetSuccessful(true)
        },
        onError(err) {
            setLoading(false)
            dispatch(showBanner({ status: 'error', message: err.message }))
        },
        variables: {
            email: token.email,
            password: token.password,
            newPassword: confirmPassword.value
        }
    })

    const onFieldUpdate = (e: any) => {
        const { name, value } = e.target
        switch (name) {
            case 'password':
                const newPasswordValue = {
                    value,
                    error: VALID_PASSWORD.test(value)
                        ? ''
                        : 'Please enter a password with at least 8 alpha-numeric digits, 1 capital letter, 1 number, and 1 special character'
                }
                setPassword(newPasswordValue)
                onValidation([newPasswordValue, confirmPassword])
                break
            case 'confirmPassword':
                const newConfirmPasswordValue = {
                    value,
                    error: VALID_PASSWORD.test(value)
                        ? ''
                        : 'Please enter a password with at least 8 alpha-numeric digits, 1 capital letter, 1 number, and 1 special character'
                }
                setConfirmPassword(newConfirmPasswordValue)
                onValidation([password, newConfirmPasswordValue])
                setPasswordsMatch(value === password.value)
                break
            default:
                break
        }
    }

    const onSubmit = (e: any) => {
        e.preventDefault()
        resetPassword()
    }

    const onLoginClick = () => {
        router.push('/login')
    }

    return (
        <section className={styles.AuthPage}>
            <Logo location="auth" />
            {resetSuccessful ? (
                <div className={styles.successDisplay}>
                    <h1>
                        <CheckCircle />
                        Your password has been reset!
                    </h1>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={onLoginClick}>
                        Login now
                    </Button>
                </div>
            ) : (
                <form className={styles.forgotPasswordForm} onSubmit={onSubmit}>
                    <h1>Create your new password</h1>
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
                    <TextField
                        label="Confirm Password"
                        name="confirmPassword"
                        error={!!confirmPassword.error}
                        helperText={confirmPassword.error}
                        value={confirmPassword.value}
                        onChange={onFieldUpdate}
                        type={showConfirmPassword ? 'text' : 'password'}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        edge="end"
                                        onClick={() =>
                                            setShowConfirmPassword(
                                                !showConfirmPassword
                                            )
                                        }>
                                        {showConfirmPassword ? (
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
                        disabled={disabled ?? !passwordsMatch}
                        loading={loading}
                        text="Submit Password"
                    />
                </form>
            )}
            {!passwordsMatch ? (
                <Alert className={styles.matchingAlert} severity="error">
                    Both passwords must match.
                </Alert>
            ) : null}
        </section>
    )
}

export default ResetPassword
