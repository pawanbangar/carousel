import CategoryActionTypes from "./category.types";

export const fetchCategoriesStart=()=>({
    type:CategoryActionTypes.FETCH_CATEGORIES_START
});

export const fetchCategoriesSuccess=collectionMap=>({
    type:CategoryActionTypes.FETCH_CATEGORIES_SUCCESS,
    payload:collectionMap
});

export const fetchCategoriesFailure=message=>({
    type:CategoryActionTypes.FETCH_CATEGORIES_FAILURE,
    payload:message
});