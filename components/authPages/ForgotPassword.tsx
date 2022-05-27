import { useState } from 'react'
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

import styles from './AuthPages.module.scss'

const ForgotPassword = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    return (
        <section className={styles.AuthPage}>
            <div className={styles.logo}>
                <Link href="/" passHref>
                    <Fastfood />
                </Link>
            </div>
            <form className={styles.forgotPasswordForm}>
                <h1>Need Help?</h1>
                <div>
                    Enter the email associated with your account. If that email
                    exists, we will send you next steps on how to reset your
                    password.
                </div>
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
                <Button variant="contained" size="large">
                    Send Help
                </Button>
            </form>
        </section>
    )
}

export default ForgotPassword
