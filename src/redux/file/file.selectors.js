import {createSelector} from 'reselect';

const selectFiles =state=>state.file;

export const selectFilesData=createSelector(
    [selectFiles],
    file=>file.files
);

export const selectFilesAsCollection=createSelector(
    [selectFilesData],
    data => Object.keys(data).reduce((array, key) => {
        return [...array, {name: key,items:data[key]}]
    }, [])
);

export const selectIsFilesFetching=createSelector(
    [selectFiles],
    file=>file.isFetching
);
export const selectisFilesLoading=createSelector(
    [selectFiles],
    file=>!!file.files
)