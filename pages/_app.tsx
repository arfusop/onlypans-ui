import { ApolloProvider } from '@apollo/client'
import { Provider } from 'react-redux'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'

import { store } from '../lib/redux/store'
import { client } from '../lib/context/apolloProvider'
import PageWrapper from '../components/layout/PageWrapper'
import Banner from '../components/banner'
import ThemeProvider from '../components/themeProvider'
import '../styles/globals.scss'

const MyApp = ({
    Component,
    pageProps
}: {
    Component: any
    pageProps: any
}) => {
    return (
        <ApolloProvider client={client}>
            <Provider store={store}>
                <ThemeProvider>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        {Component.auth ? (
                            <Component {...pageProps} />
                        ) : (
                            <PageWrapper>
                                <Component {...pageProps} />
                            </PageWrapper>
                        )}
                        <Banner />
                    </LocalizationProvider>
                </ThemeProvider>
            </Provider>
        </ApolloProvider>
    )
}

export default MyApp
