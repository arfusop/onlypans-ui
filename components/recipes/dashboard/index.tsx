import { useState } from 'react'
import Link from 'next/link'
import { IconButton } from '@mui/material'
import { AddCircle } from '@mui/icons-material'
import { TextField } from '@mui/material'

import { SelectMultipleField } from '../../form/SelectField'
import styles from './Dashboard.module.scss'

const RecipeDashboard = () => {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([])
    const [searchParam, setSearchParam] = useState<string>('')

    const onCategorySelect = (updatedCategories: string[]) => {
        setSelectedCategories(updatedCategories)
        // trigger the filtering of available categories
    }

    const onSearchUpdate = (e: any) => {
        setSearchParam(e.target.value)
    }

    return (
        <section className={styles.RecipeDashboard}>
            <div className={styles.header}>
                <div className={styles.message}>
                    <span>Your Recipes</span>
                    <Link href="/recipes/add" passHref>
                        <IconButton>
                            <AddCircle />
                        </IconButton>
                    </Link>
                </div>
                <div className={styles.filterFields}>
                    <SelectMultipleField
                        options={['breakfast', 'lunch', 'dinner', 'dessert']}
                        onChange={onCategorySelect}
                        value={selectedCategories}
                        name="categories"
                        label="Categories"
                    />
                    <TextField
                        label="Search"
                        name="search"
                        value={searchParam}
                        onChange={onSearchUpdate}
                    />
                </div>
            </div>
        </section>
    )
}

export default RecipeDashboard
