import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Snackbar, Alert } from '@mui/material'

import { closeBanner } from '../../lib/redux/bannerSlice'

const Banner = () => {
    const banner = useSelector((state: any) => state.banner)
    const dispatch = useDispatch()

    if (!banner.status) {
        return null
    }

    const onCloseBanner = () => {
        dispatch(closeBanner())
    }

    return (
        <Snackbar
            open={banner.status ? true : false}
            autoHideDuration={1000000}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            onClose={onCloseBanner}>
            <Alert
                className="BannerAlert"
                onClose={onCloseBanner}
                severity={banner.type}
                sx={{ width: '100%' }}>
                {banner.message}
            </Alert>
        </Snackbar>
    )
}

export default Banner
