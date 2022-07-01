import { useReducer, useState } from 'react'
import {
    EmojiEvents,
    EmojiEventsOutlined,
    Add,
    Undo
} from '@mui/icons-material'
import { TextField, IconButton } from '@mui/material'

import { SelectField } from '../../form/SelectField'
import RatingField from '../../form/RatingField'
import Card from '../../card'

import { FLOAT_WITH_2_DIGITS } from '../../../utilities/regex'
import { UPDATE, REPLACE } from '../../../utilities/constants'
import { initialState, reducer } from './store'
import styles from './RecipeForm.module.scss'

const RecipeForm = ({ type }: { type: 'add' | 'edit' }) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const [addNewCategory, setAddNewCategory] = useState<boolean>(false)

    const onRatingFieldUpdate = (payload: { label: string; data: any }) =>
        dispatch({ type: UPDATE, payload })

    const onFieldUpdate = (e: any) =>
        dispatch({
            type: UPDATE,
            payload: { label: e.target.name, data: e.target.value }
        })

    const onNumberFieldUpdate = (e: any) => {
        const { name, value } = e.target
        const isValid = FLOAT_WITH_2_DIGITS.test(value)

        if (!isValid) return

        dispatch({ type: UPDATE, payload: { label: name, data: value } })
    }

    // if no categories, set category field to text field
    // if user clicks the +, set category field to text field
    // else leave as select field

    return (
        <section>
            <div className={`${styles.formCard} ${styles.primaryInfo}`}>
                <div>
                    <RatingField
                        label="Rating"
                        max={5}
                        precision={0.5}
                        name="rating"
                        value={state.rating}
                        onSelect={onRatingFieldUpdate}
                        icon={null}
                        emptyIcon={null}
                        customIcons={false}
                    />
                    <RatingField
                        label="Skill Level"
                        max={5}
                        precision={0.5}
                        name="skill"
                        value={state.skill}
                        onSelect={onRatingFieldUpdate}
                        icon={<EmojiEvents />}
                        emptyIcon={<EmojiEventsOutlined />}
                        customIcons
                    />
                </div>
                <div>
                    <TextField
                        label="Recipe Name"
                        name="name"
                        value={state.name}
                        onChange={onFieldUpdate}
                    />
                    {addNewCategory ? (
                        <div className={styles.categoryField}>
                            <TextField
                                value={state.category}
                                name="category"
                                label="New Category"
                                onChange={onFieldUpdate}
                            />
                            <IconButton
                                onClick={() => setAddNewCategory(false)}>
                                <Undo />
                            </IconButton>
                        </div>
                    ) : (
                        <div className={styles.categoryField}>
                            <SelectField
                                value={state.category}
                                name="category"
                                label="Category"
                                options={[
                                    { text: 'Breakfast', icon: null },
                                    { text: 'Lunch', icon: null }
                                ]}
                                onChange={onFieldUpdate}
                            />
                            <IconButton onClick={() => setAddNewCategory(true)}>
                                <Add />
                            </IconButton>
                        </div>
                    )}
                </div>
                <div>
                    <TextField
                        label="Prep Time"
                        name="prepTime"
                        value={state.prepTime ?? ''}
                        onChange={onNumberFieldUpdate}
                    />
                    <TextField
                        label="Cook Time"
                        name="cookTime"
                        value={state.cookTime ?? ''}
                        onChange={onNumberFieldUpdate}
                    />
                    <TextField
                        label="Servings"
                        name="servings"
                        value={state.servings ?? ''}
                        onChange={onNumberFieldUpdate}
                    />
                </div>
            </div>
            <div className={`${styles.formCard} ${styles.ingredients}`}>
                Ingredients
            </div>
            <div className={`${styles.formCard} ${styles.directions}`}>
                Directions
            </div>
            <div className={`${styles.formCard} ${styles.notes}`}>Notes</div>
        </section>
    )
}

export default RecipeForm

// Category should be a single select field, with the ability to write in a new category
