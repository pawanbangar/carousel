import {createSelector} from 'reselect';
const selectCarousel =state=>state.carousel;

export const selectCarouselData=createSelector(
    [selectCarousel],
    carousel=>carousel.files
);

export const selectCarouselAsCollection=createSelector(
    [selectCarouselData],
    data => Object.keys(data).reduce((array, key) => {
        return [...array, {name: key,items:data[key]}]
    }, [])
);
export const selectCarouselAsCollectionWithKey=createSelector(
    [selectCarouselData],
    data => Object.keys(data).reduce((array, key) => {
        return [...array, {name: key,items:data[key]}]
    }, [])
);

export const selectIsCarouselAdding=createSelector(
    [selectCarousel],
    carousel=>carousel.isAdding
);