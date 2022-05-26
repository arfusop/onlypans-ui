import { createStore } from 'easy-peasy'
import { setUser, setBanner, wipeBanner } from './actions'

const store = createStore({
    // user: null,
    banner: { type: '', message: '' },
    // setUser,
    setBanner
    // wipeBanner
})

export default store
