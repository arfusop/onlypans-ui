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

const ResetPassword = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    // check if email in url is 100% associated with an account. if not, redirect to info page

    return (
        <section className={styles.AuthPage}>
            <div className={styles.logo}>
                <Link href="/" passHref>
                    <Fastfood />
                </Link>
            </div>
            <form className={styles.forgotPasswordForm}>
                <h1>Create your new password</h1>
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
                <TextField
                    label="Confirm Password"
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
                <Button variant="contained" size="large">
                    Submit Password
                </Button>
            </form>
        </section>
    )
}

export default ResetPassword
