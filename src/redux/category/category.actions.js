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

export const fetchCategoriesStartAsync=()=>{
    return dispatch=>{
        dispatch(fetchCategoriesStart());
        dispatch(fetchCategoriesSuccess({
            house:8,
            home:10,
            vehicle:7,
            nature:9,
            fashion:4,
            plant:8,
            outdoor:9,
            bag:8,
            sport:9,
            blue:10
        }));
    }
}