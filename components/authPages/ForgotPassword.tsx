import { useState, useEffect, useCallback } from 'react'
import { TextField, InputAdornment, IconButton, Button } from '@mui/material'
import { AccountCircle } from '@mui/icons-material'

import useFormValidation from './utils/hooks/useFormValidation'
import { VALID_EMAIL } from '../../utilities/regex'
import styles from './AuthPages.module.scss'
import Logo from '../logo'

type formValueTypes = {
    value: string
    error: string
}

const ForgotPassword = () => {
    const { disabled, onValidation } = useFormValidation()

    const [email, setEmail] = useState<formValueTypes>({ value: '', error: '' })

    // TODO: check if email exists

    const onFieldUpdate = (e: any) => {
        const { value } = e.target

        const newEmailValue = {
            value,
            error: VALID_EMAIL.test(value) ? '' : 'Please enter a valid email'
        }
        setEmail(newEmailValue)
        onValidation([newEmailValue])
    }

    return (
        <section className={styles.AuthPage}>
            <Logo location="auth" />
            <form className={styles.forgotPasswordForm}>
                <h1>Need Help?</h1>
                <div>
                    Enter the email associated with your account. If that email
                    exists, we will send you next steps on how to reset your
                    password.
                </div>
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
                <Button disabled={disabled} variant="contained" size="large">
                    Send Help
                </Button>
            </form>
        </section>
    )
}

export default ForgotPassword
