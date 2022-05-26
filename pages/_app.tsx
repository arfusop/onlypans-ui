import { ApolloProvider } from '@apollo/client'
// import { StoreProvider } from 'easy-peasy'
import { Provider } from 'react-redux'

import { store } from '../lib/redux/store'
import { client } from '../lib/context/apolloProvider'
// import store from '../lib/easypeasy/store'
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
            {/* <StoreProvider store={store}> */}
            <Provider store={store}>
                {Component.auth ? (
                    <Component {...pageProps} />
                ) : (
                    <PageWrapper>
                        <Component {...pageProps} />
                    </PageWrapper>
                )}
                <Banner />
                {/* </StoreProvider> */}
            </Provider>
        </ApolloProvider>
    )
}

export default MyApp
