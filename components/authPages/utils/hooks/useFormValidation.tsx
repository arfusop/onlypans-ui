import { useState, useCallback } from 'react'

type FormItemsType = {
    value: string
    error: string
}

type ReturnTypes = {
    disabled: boolean
    onValidation: Function
    reset: Function
}

export default function (): ReturnTypes {
    const [disabled, setDisabled] = useState<boolean>(true)

    const onSubmitDisabledCheck = useCallback((formItems: FormItemsType[]) => {
        if (disabled) {
            const isValid = formItems.every(
                (item: FormItemsType) => item.value && !item.error
            )
            if (isValid) setDisabled(false)
        } else {
            const isInvalid = formItems.some(
                (item: FormItemsType) => item.value && !item.error
            )
            if (isInvalid) setDisabled(true)
        }
    }, [])

    return {
        disabled,
        onValidation: onSubmitDisabledCheck,
        reset: () => setDisabled(false)
    }
}
