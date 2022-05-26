import { action } from 'easy-peasy'

export const setUser = action((state: any, payload: any) => {
    state.user = payload
})

/**
 * @param {boolean} show
 * @param {string} description
 * @param {'error' | 'success' | 'warning' | 'info'} type
 */
type bannerPayload = {
    payload: {
        type: 'error' | 'warning' | 'info' | 'success'
        message: string
    }
}
export const setBanner = action((state: any, payload: bannerPayload) => {
    state.banner = payload
})

export const wipeBanner = action((state: any) => {
    state.banner = {}
})
