import { useDispatch } from 'react-redux'
import { Switch } from '@mui/material'
import { ModeNight, Brightness7 } from '@mui/icons-material'

import { setTheme } from '../../lib/redux/themeSlice'
import { DARK, LIGHT, STORED_THEME_KEY } from '../../utilities/constants'
import styles from './Nav.module.scss'

const ThemeSwitch = () => {
    const dispatch = useDispatch()

    const onThemeChange = (e: any) => {
        if (e.target.checked) {
            dispatch(setTheme(DARK))
            document.querySelector('html')?.setAttribute('data-theme', DARK)
            localStorage.setItem(STORED_THEME_KEY, DARK)
        } else {
            dispatch(setTheme(LIGHT))
            document.querySelector('html')?.setAttribute('data-theme', LIGHT)
            localStorage.setItem(STORED_THEME_KEY, LIGHT)
        }
    }

    return (
        <div className={styles.ThemeSwitch}>
            <Switch
                disableRipple
                onChange={onThemeChange}
                icon={
                    <div className={styles.customSwitch}>
                        <Brightness7 />
                    </div>
                }
                checkedIcon={
                    <div className={styles.customSwitch}>
                        <ModeNight />
                    </div>
                }
            />
        </div>
    )
}

export default ThemeSwitch
