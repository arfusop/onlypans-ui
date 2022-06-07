import { LoadingButton } from '@mui/lab'

type ButtonTypes = {
    disabled: boolean
    loading: boolean
    text: string
}

const ButtonWithLoader = ({ disabled, loading, text }: ButtonTypes) => {
    return (
        <LoadingButton
            variant="contained"
            size="large"
            type="submit"
            disabled={disabled}
            loading={loading}>
            {text}
        </LoadingButton>
    )
}

export default ButtonWithLoader
