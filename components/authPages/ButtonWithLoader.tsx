import { MouseEventHandler } from 'react'
import { LoadingButton } from '@mui/lab'

type ButtonTypes = {
    disabled: boolean
    loading: boolean
    text: string
    onSubmit: any // TODO: Figure out how to TS this material bs...
    // onSubmit: MouseEventHandler<HTMLAnchorElement>
}

const ButtonWithLoader = ({
    disabled,
    loading,
    text,
    onSubmit
}: ButtonTypes) => {
    return (
        <LoadingButton
            variant="contained"
            size="large"
            disabled={disabled}
            loading={loading}
            loadingPosition="end"
            endIcon={null}
            onClick={onSubmit}>
            {text}
        </LoadingButton>
    )
}

export default ButtonWithLoader
