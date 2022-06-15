import {
    Select,
    SelectChangeEvent,
    OutlinedInput,
    MenuItem,
    InputLabel,
    FormControl,
    Checkbox,
    ListItemText
} from '@mui/material'

import styles from './SelectField.module.scss'

type SelectFieldTypes = {
    label: string
    options: {
        text: string
        icon: any
    }[]
    value: string
    name: string
    onChange: Function
}

export const SelectField = ({
    label,
    value,
    options,
    name,
    onChange
}: SelectFieldTypes) => {
    const onClick = (e: any) =>
        onChange({ target: { name, value: e.target.value } })

    return (
        <FormControl fullWidth>
            <InputLabel id={label}>{label}</InputLabel>
            <Select
                className={styles.SelectfieldDisplay}
                labelId={label}
                label={label}
                name={name}
                value={value}
                onChange={onClick}>
                {options?.length ? (
                    options.map((item, key) => (
                        <MenuItem key={key} value={item.text}>
                            {item?.icon ? <>{item.icon} </> : null}
                            {item.text}
                        </MenuItem>
                    ))
                ) : (
                    <div>No available options</div>
                )}
            </Select>
        </FormControl>
    )
}

type SelectMultipleFieldTypes = {
    label: string
    options: string[]
    value: string[]
    name: string
    onChange: Function
}

export const SelectMultipleField = ({
    label,
    value,
    options,
    name,
    onChange
}: SelectMultipleFieldTypes) => {
    const onClick = (event: any) => {
        const {
            target: { value }
        } = event
        onChange(typeof value === 'string' ? value.split(',') : value)
    }

    return (
        <FormControl fullWidth>
            <InputLabel id={label}>{label}</InputLabel>
            <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                name={name}
                value={value}
                onChange={onClick}
                input={<OutlinedInput label="Tag" />}
                renderValue={(selected: any) => selected.join(', ')}>
                {options?.length ? (
                    options.map((item: string) => (
                        <MenuItem key={item} value={item}>
                            <Checkbox checked={value.indexOf(item) > -1} />
                            <ListItemText primary={item} />
                        </MenuItem>
                    ))
                ) : (
                    <div>No available options</div>
                )}
            </Select>
        </FormControl>
    )
}
