import { ApolloProvider } from '@apollo/client'
import { Provider } from 'react-redux'

import { store } from '../lib/redux/store'
import { client } from '../lib/context/apolloProvider'
import PageWrapper from '../components/layout/PageWrapper'
import Banner from '../components/banner'
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
                {Component.auth ? (
                    <Component {...pageProps} />
                ) : (
                    <PageWrapper>
                        <Component {...pageProps} />
                    </PageWrapper>
                )}
                <Banner />
            </Provider>
        </ApolloProvider>
    )
}

export default MyApp
