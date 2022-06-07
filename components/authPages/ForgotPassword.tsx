import { useState } from 'react'
import { TextField, InputAdornment, IconButton, Button } from '@mui/material'
import { AccountCircle, CheckCircle } from '@mui/icons-material'
import { useDispatch } from 'react-redux'
import { useMutation } from '@apollo/client'

import { FORGOT_PASSWORD } from '../../lib/graphql/mutations/user'
import { showBanner } from '../../lib/redux/bannerSlice'
import ButtonWithLoader from './ButtonWithLoader'
import useFormValidation from './utils/hooks/useFormValidation'
import { VALID_EMAIL } from '../../utilities/regex'
import styles from './AuthPages.module.scss'
import Logo from '../logo'

type formValueTypes = {
    value: string
    error: string
}

const ForgotPassword = () => {
    const dispatch = useDispatch()
    const { disabled, onValidation } = useFormValidation()

    const [email, setEmail] = useState<formValueTypes>({ value: '', error: '' })
    const [loading, setLoading] = useState(false)
    const [formSubmitted, setFormSubmitted] = useState(false)

    const onFieldUpdate = (e: any) => {
        const { value } = e.target

        const newEmailValue = {
            value,
            error: VALID_EMAIL.test(value) ? '' : 'Please enter a valid email'
        }
        setEmail(newEmailValue)
        onValidation([newEmailValue])
    }

    const [forgotPassword] = useMutation(FORGOT_PASSWORD, {
        onCompleted() {
            setLoading(false)
            setFormSubmitted(true)
        },
        onError(err) {
            setLoading(false)
            dispatch(showBanner({ status: 'error', message: err.message }))
        },
        variables: {
            email: email.value
        }
    })

    const onSubmit = (e: any) => {
        e.preventDefault()
        setLoading(true)
        forgotPassword()
    }

    const onReset = () => {
        setEmail({ value: '', error: '' })
        setFormSubmitted(false)
    }

    return (
        <section className={styles.AuthPage}>
            <Logo location="auth" />
            {formSubmitted ? (
                <div className={styles.successDisplay}>
                    <h1>
                        <CheckCircle />
                        Help is on the way!
                    </h1>
                    <div>
                        An email has been sent out to {email.value}, it should
                        be arriving within the next few minutes.
                    </div>
                    If you didn't get the email or may have put the wrong email
                    in, click below to try again:
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={onReset}>
                        Try again
                    </Button>
                </div>
            ) : (
                <form className={styles.forgotPasswordForm} onSubmit={onSubmit}>
                    <h1>Need Help?</h1>
                    <div>
                        Enter the email associated with your account. If that
                        email exists, we will send you next steps on how to
                        reset your password.
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
                    <ButtonWithLoader
                        disabled={disabled}
                        loading={loading}
                        text="Send Help"
                    />
                </form>
            )}
        </section>
    )
}

export default ForgotPassword
