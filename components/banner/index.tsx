import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Snackbar, Alert } from '@mui/material'

import { closeBanner } from '../../lib/redux/bannerSlice'

const TIMER = 6000

const Banner = () => {
    const banner = useSelector((state: any) => state.banner)
    const dispatch = useDispatch()

    const [showing, setShowing] = useState(false)

    useEffect(() => {
        if (banner?.status && !showing) {
            setShowing(true)
        }
    }, [banner])

    if (!banner.status) {
        return null
    }

    const onCloseBanner = () => {
        setShowing(false)
        dispatch(closeBanner())
    }

    return (
        <Snackbar
            open={showing}
            autoHideDuration={6000}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            onClose={onCloseBanner}>
            <Alert
                className="BannerAlert"
                onClose={onCloseBanner}
                severity={banner.status}
                sx={{ width: '100%' }}>
                {banner.message}
            </Alert>
        </Snackbar>
    )
}

export default Banner
