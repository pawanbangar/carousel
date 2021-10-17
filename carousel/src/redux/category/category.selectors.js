import {createSelector} from 'reselect';

const selectCategory =state=>state.category;

export const selectCategories=createSelector(
    [selectCategory],
    category=>category.categories
);

export const selectCategoriesAsCollection=createSelector(
    [selectCategories],
    data => Object.keys(data).reduce((array, key) => {
        return [...array, {name: key,items:data[key]}]
    }, [])
);

export const selectOnlyCategories=createSelector(
    [selectCategories],
    data => data?Object.keys(data).reduce((array, key) => {
        return [...array, key]
    }, []):[]
)

export const selectFirstCategory=createSelector(
    [selectCategoriesAsCollection],
    categories=>categories[0]
);
export const selectisCategoriesLoading=createSelector(
    [selectCategory],
    category=>!!category.categories
)