import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { createTheme, ThemeProvider } from '@mui/material/styles'

import { setTheme } from '../../lib/redux/themeSlice'
import { STORED_THEME_KEY, DARK, LIGHT } from '../../utilities/constants'

const ThemeWrapper = ({ children }: { children: any }) => {
    const dispatch = useDispatch()

    useEffect(() => {
        const storedTheme = localStorage.getItem(STORED_THEME_KEY)
        const currentTheme = storedTheme === DARK ? DARK : LIGHT
        document.querySelector('html')?.setAttribute('data-theme', currentTheme)
        dispatch(setTheme({ theme: currentTheme }))
    }, [])

    // const lightTheme = createTheme({
    //     palette: {
    //         type: 'light',
    //         primary: {
    //           main: '#90caf9',
    //         },
    //         secondary: {
    //           main: '#f48fb1',
    //         },
    //         background: {
    //           default: '#212121',
    //           paper: '#424242',
    //         },
    //       },
    // })

    // const theme = createTheme({
    //     palette: {
    //       primary: {
    //         main: orange[500],
    //       },
    //     },
    //   });

    // import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';

    // export const themeOptions: ThemeOptions = {
    //   palette: {
    //     type: 'dark',
    //     primary: {
    //       main: '#90caf9',
    //     },
    //     secondary: {
    //       main: '#f48fb1',
    //     },
    //     background: {
    //       default: '#212121',
    //       paper: '#424242',
    //     },
    //   },
    // };

    return (
        <main>
            {/* <ThemeProvider> */}
            {children}
            {/* </ThemeProvider> */}
        </main>
    )
}

export default ThemeWrapper
