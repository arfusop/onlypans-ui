import { Select, MenuItem, InputLabel, FormControl } from '@mui/material'

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

const SelectField = ({
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

export default SelectField
