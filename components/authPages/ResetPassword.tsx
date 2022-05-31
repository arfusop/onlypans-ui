import { useState } from 'react'
import Link from 'next/link'
import { TextField, InputAdornment, IconButton, Button } from '@mui/material'
import { Visibility, VisibilityOff, Fastfood } from '@mui/icons-material'

import { VALID_PASSWORD } from '../../utilities/regex'
import useFormValidation from './utils/hooks/useFormValidation'
import styles from './AuthPages.module.scss'
import Logo from '../logo'

type formValueTypes = {
    value: string
    error: string
}

const ResetPassword = () => {
    const { disabled, onValidation } = useFormValidation()
    const [password, setPassword] = useState<formValueTypes>({
        value: '',
        error: ''
    })
    const [confirmPassword, setConfirmPassword] = useState<formValueTypes>({
        value: '',
        error: ''
    })
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [showConfirmPassword, setShowConfirmPassword] =
        useState<boolean>(false)

    // check if email in url is 100% associated with an account. if not, redirect to info page
    // add check for if passwords DO NOT MATCH
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
                break
            default:
                break
        }
    }

    return (
        <section className={styles.AuthPage}>
            <Logo location="auth" />
            <form className={styles.forgotPasswordForm}>
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
                <Button disabled={disabled} variant="contained" size="large">
                    Submit Password
                </Button>
            </form>
        </section>
    )
}

export default ResetPassword
