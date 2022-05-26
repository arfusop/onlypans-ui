import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'

import { client } from '../context/apolloProvider'
import PageWrapper from '../components/layout/PageWrapper'
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
            {Component.auth ? (
                <Component {...pageProps} />
            ) : (
                <PageWrapper>
                    <Component {...pageProps} />
                </PageWrapper>
            )}
        </ApolloProvider>
    )
}

export default MyApp
