import { useReducer, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TextField } from '@mui/material'
import { Male, Female, IndeterminateCheckBox } from '@mui/icons-material'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker'
import { useMutation } from '@apollo/client'

import ButtonWithLoader from '../authPages/ButtonWithLoader'
import SelectField from '../form/SelectField'

import { showBanner } from '../../lib/redux/bannerSlice'
import { refreshUser } from '../../lib/redux/userSlice'
import { UPDATE_USER } from '../../lib/graphql/mutations/user'

import { JWT_SECRET } from '../../utilities/constants'
import { decodeProvidedToken } from '../../utilities/token'
import { FLOAT_WITH_2_DIGITS } from '../../utilities/regex'
import {
    reducer,
    initialState,
    UPDATE,
    REPLACE,
    ADD_ERROR,
    REMOVE_ERROR
} from './store'
import styles from './AccountEditing.module.scss'

const EditAccount = () => {
    const reduxDispatch = useDispatch()
    const user = useSelector((state: any) => state.user)

    const [state, dispatch] = useReducer(reducer, initialState)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const userImportData = { ...user }
        delete userImportData.id
        delete userImportData.loggedIn
        delete userImportData.email
        delete userImportData.password
        dispatch({ type: REPLACE, payload: userImportData })
    }, [user])

    const onFieldUpdate = (e: any) => {
        dispatch({
            type: UPDATE,
            payload: { label: e.target.name, data: e.target.value }
        })
    }

    const onDateFieldUpdate = (newValue: Date | null) => {
        dispatch({
            type: UPDATE,
            payload: { label: 'dob', data: newValue }
        })
    }

    const onNumberFieldUpdate = (e: any) => {
        const { name, value } = e.target
        const isValid = FLOAT_WITH_2_DIGITS.test(value)

        if (isValid) {
            dispatch({
                type: REMOVE_ERROR,
                payload: {
                    label: name,
                    data: ''
                }
            })
            dispatch({
                type: UPDATE,
                payload: { label: name, data: parseFloat(value) }
            })
        } else {
            dispatch({
                type: ADD_ERROR,
                payload: {
                    label: name,
                    data: 'Enter a valid number with no more than 2 decimals'
                }
            })
            dispatch({ type: UPDATE, payload: { label: name, data: '' } })
        }
    }

    const [updateUser] = useMutation(UPDATE_USER, {
        onCompleted({ updateUser: data }) {
            localStorage.setItem(JWT_SECRET, data.token)
            const decoded = decodeProvidedToken(data.token)
            reduxDispatch(refreshUser(decoded))
            setLoading(false)
            reduxDispatch(
                showBanner({
                    status: 'success',
                    message: 'Account updated successfully!'
                })
            )
        },
        onError(err: any) {
            setLoading(false)
            reduxDispatch(
                showBanner({
                    status: 'success',
                    message: err.message
                })
            )
        },
        variables: {
            email: user.email,
            firstName: state.firstName ?? '',
            lastName: state.lastName ?? '',
            dob: state.dob ?? null,
            gender: state.gender ?? '',
            height: state.height ?? null,
            weight: state.weight ?? null,
            goalWeight: state.goalWeight ?? null,
            bodyFat: state.bodyFat ?? null,
            goalBodyFat: state.goalBodyFat ?? null,
            activityLevel: state.activityLevel ?? ''
        }
    })

    const onSubmit = (e: any) => {
        e.preventDefault()
        updateUser()
    }

    return (
        <section className={styles.EditAccountSection}>
            <form onSubmit={onSubmit}>
                <h1>Welcome to OnlyPans</h1>
                <p>Let's finish setting your account up.</p>
                <div className={`${styles.twoCols} ${styles.formRow}`}>
                    <TextField disabled value={user.email} label="Email" />
                    <TextField
                        disabled
                        label="Password"
                        type="password"
                        value="********"
                    />
                </div>
                <div className={`${styles.threeCols} ${styles.formRow}`}>
                    <TextField
                        label="First Name"
                        name="firstName"
                        value={state.firstName ?? ''}
                        onChange={onFieldUpdate}
                    />
                    <TextField
                        label="Last Name"
                        name="lastName"
                        value={state.lastName ?? ''}
                        onChange={onFieldUpdate}
                    />
                    <DesktopDatePicker
                        label="Date of Birth"
                        inputFormat="MM/dd/yyyy"
                        value={state.dob}
                        onChange={onDateFieldUpdate}
                        renderInput={params => (
                            <TextField
                                className={styles.datePicker}
                                {...params}
                            />
                        )}
                    />
                    <MobileDatePicker
                        label="Date of Birth"
                        inputFormat="MM/dd/yyyy"
                        value={state.dob}
                        onChange={onDateFieldUpdate}
                        renderInput={params => (
                            <TextField
                                className={styles.mobileDatePicker}
                                {...params}
                            />
                        )}
                    />
                </div>
                <div className={`${styles.threeCols} ${styles.formRow}`}>
                    <SelectField
                        value={state.gender}
                        name="gender"
                        label="Gender"
                        options={[
                            { text: 'Male', icon: <Male /> },
                            { text: 'Female', icon: <Female /> },
                            { text: 'Other', icon: <IndeterminateCheckBox /> }
                        ]}
                        onChange={onFieldUpdate}
                    />
                    <TextField
                        error={!!state.errors?.height}
                        helperText={state.errors?.height}
                        label="Height"
                        name="height"
                        value={state.height ?? ''}
                        onChange={onNumberFieldUpdate}
                    />
                    <SelectField
                        name="activityLevel"
                        label="Activity Level"
                        onChange={onFieldUpdate}
                        options={[
                            { text: 'Sedentary (Desk job)', icon: null },
                            {
                                text: 'Light Exercise (1-2 days/week)',
                                icon: null
                            },
                            {
                                text: 'Moderate Exercise (3-5 days/week)',
                                icon: null
                            },
                            {
                                text: 'Heavy Exercise (6-7 days/week',
                                icon: null
                            },
                            {
                                text: 'Athlete (2x times per day/8+ times per week)',
                                icon: null
                            }
                        ]}
                        value={state.activityLevel}
                    />
                </div>
                <div className={`${styles.fourCols} ${styles.formRow}`}>
                    <TextField
                        error={!!state.errors?.weight}
                        helperText={state.errors?.weight}
                        label="Weight"
                        name="weight"
                        value={state.weight ?? ''}
                        onChange={onNumberFieldUpdate}
                    />
                    <TextField
                        error={!!state.errors?.goalWeight}
                        helperText={state.errors?.goalWeight}
                        label="Goal Weight"
                        name="goalWeight"
                        value={state.goalWeight ?? ''}
                        onChange={onNumberFieldUpdate}
                    />
                    <TextField
                        error={!!state.errors?.bodyFat}
                        helperText={state.errors?.bodyFat}
                        label="Body Fat"
                        name="bodyFat"
                        value={state.bodyFat ?? ''}
                        onChange={onNumberFieldUpdate}
                    />
                    <TextField
                        error={!!state.errors?.goalBodyFat}
                        helperText={state.errors?.goalBodyFat}
                        label="Goal Body Fat"
                        name="goalBodyFat"
                        value={state.goalBodyFat ?? ''}
                        onChange={onNumberFieldUpdate}
                    />
                </div>
                <ButtonWithLoader
                    text="Update Account"
                    disabled={false}
                    loading={loading}
                />
            </form>
        </section>
    )
}

export default EditAccount
