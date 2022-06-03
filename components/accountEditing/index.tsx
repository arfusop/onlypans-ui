import { useReducer } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    TextField,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    InputAdornment,
    IconButton,
    Checkbox,
    FormControlLabel
} from '@mui/material'
import { Male, Female, IndeterminateCheckBox } from '@mui/icons-material'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker'

import { VALID_FLOATS } from '../../utilities/regex'
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
    const user = useSelector((state: any) => state.user)
    const [state, dispatch] = useReducer(reducer, initialState)

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
        const isValid = VALID_FLOATS.test(value)

        if (isValid) {
            dispatch({
                type: REMOVE_ERROR,
                payload: {
                    label: name,
                    data: ''
                }
            })
            dispatch({ type: UPDATE, payload: { label: name, data: value } })
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

    return (
        <section className={styles.EditAccountSection}>
            <form>
                <h1>Welcome to OnlyPans</h1>
                <p>Let's finish setting your account up.</p>
                <div className={styles.twoCols}>
                    <TextField disabled value={user.email} label="Email" />
                    <TextField
                        disabled
                        label="Password"
                        type="password"
                        value="********"
                    />
                </div>
                <div className={styles.threeCols}>
                    <TextField
                        label="First Name"
                        name="firstName"
                        value={state.firstName}
                        onChange={onFieldUpdate}
                    />
                    <TextField
                        label="Last Name"
                        name="lastName"
                        value={state.lastName}
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
                <div className={styles.threeCols}>
                    <FormControl fullWidth>
                        <InputLabel id="Gender">Gender</InputLabel>
                        <Select
                            labelId="Gender"
                            label="Gender"
                            name="gender"
                            value={state.gender}
                            onChange={onFieldUpdate}>
                            <MenuItem value="Male">
                                <Male /> Male
                            </MenuItem>
                            <MenuItem value="Female">
                                <Female /> Female
                            </MenuItem>
                            <MenuItem value="Other">
                                <IndeterminateCheckBox /> Other
                            </MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        error={!!state.errors?.height}
                        helperText={state.errors?.height}
                        label="Height"
                        name="height"
                        value={state.height}
                        onChange={onNumberFieldUpdate}
                    />
                </div>
            </form>
        </section>
    )
}

export default EditAccount
