import { useDispatch, useSelector } from 'react-redux'
import { Switch } from '@mui/material'
import { ModeNight, Brightness7 } from '@mui/icons-material'

import { setTheme } from '../../lib/redux/themeSlice'
import { DARK, LIGHT, STORED_THEME_KEY } from '../../utilities/constants'
import styles from './Nav.module.scss'

const ThemeSwitch = () => {
    const dispatch = useDispatch()
    const theme = useSelector((state: any) => state.theme.mode)

    const onThemeChange = (e: any) => {
        if (e.target.checked) {
            dispatch(setTheme({ theme: DARK }))
            document.querySelector('html')?.setAttribute('data-theme', DARK)
            localStorage.setItem(STORED_THEME_KEY, DARK)
        } else {
            dispatch(setTheme({ theme: LIGHT }))
            document.querySelector('html')?.setAttribute('data-theme', LIGHT)
            localStorage.setItem(STORED_THEME_KEY, LIGHT)
        }
    }

    return (
        <div className={styles.ThemeSwitch}>
            <Switch
                disableRipple
                checked={theme === DARK}
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
