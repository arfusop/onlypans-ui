import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { setTheme } from '../../lib/redux/themeSlice'
import { STORED_THEME_KEY, DARK, LIGHT } from '../../utilities/constants'

const ThemeProvider = ({ children }: { children: any }) => {
    const dispatch = useDispatch()

    useEffect(() => {
        const storedTheme = localStorage.getItem(STORED_THEME_KEY)
        const currentTheme = storedTheme === DARK ? DARK : LIGHT
        document.querySelector('html')?.setAttribute('data-theme', currentTheme)
        dispatch(setTheme({ theme: currentTheme }))
    }, [])

    return <main>{children}</main>
}

export default ThemeProvider
