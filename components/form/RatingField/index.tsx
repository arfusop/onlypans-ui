import { Rating, Typography } from '@mui/material'

import styles from './RatingField.module.scss'

type RatingFieldTypes = {
    label: string
    max: number
    precision: 0.5 | 1
    name: string
    value: number
    onSelect: Function
    icon: any
    emptyIcon: any
    customIcons: boolean
}

const RatingField = ({
    label,
    max,
    precision,
    name,
    value,
    onSelect,
    icon,
    emptyIcon,
    customIcons
}: RatingFieldTypes) => {
    const onSelected = (e: any) => {
        onSelect({ label: e.target.name, data: parseFloat(e.target.value) })
    }

    return (
        <div className={styles.RatingField}>
            <Typography component="legend">{label}</Typography>
            {customIcons ? (
                <Rating
                    name={name}
                    max={max}
                    precision={precision}
                    onChange={onSelected}
                    value={value}
                    icon={icon}
                    emptyIcon={emptyIcon}
                />
            ) : (
                <Rating
                    name={name}
                    max={max}
                    precision={precision}
                    onChange={onSelected}
                    value={value}
                />
            )}
        </div>
    )
}

export default RatingField
