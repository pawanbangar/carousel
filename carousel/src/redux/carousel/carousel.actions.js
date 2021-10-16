import CarouselActionTypes from "./carousel.types";

export const AddAllFilesStart=(files)=>({
    type:CarouselActionTypes.ADD_ALL_FILES_START,
    payload:files
});

export const AddAllFilesSuccess=collectionMap=>({
    type:CarouselActionTypes.ADD_ALL_FILES_SUCCESS,
    payload:collectionMap
});

export const AddAllFilesFailure=message=>({
    type:CarouselActionTypes.ADD_ALL_FILES_FAILURE,
    payload:message
});

export const AddSingleFile=(data)=>({
    type:CarouselActionTypes.ADD_SINGLE_FILE_START,
    payload:data
});

// Add Single File
export const AddSingleFilesSuccess=data=>({
    type:CarouselActionTypes.ADD_SINGLE_FILE_SUCCESS,
    payload:data
});

export const AddSingleFileFailure=message=>({
    type:CarouselActionTypes.ADD_ALL_FILES_FAILURE,
    payload:message
});

// Remove Single File
export const RemoveSingleFile=(data)=>({
    type:CarouselActionTypes.REMOVE_SINGLE_FILE_START,
    payload:data
});

export const RemoveSingleFileSuccess=data=>({
    type:CarouselActionTypes.ADD_SINGLE_FILE_SUCCESS,
    payload:data
});

export const RemoveSingleFileFailure=message=>({
    type:CarouselActionTypes.ADD_ALL_FILES_FAILURE,
    payload:message
});

// Select Carousel Slide
export const SelectcarouselSlideStart=(data)=>({
    type:CarouselActionTypes.SELECT_CAROUSEL_INDEX_START,
    payload:data
});

export const SelectcarouselSlideSuccess=data=>({
    type:CarouselActionTypes.SELECT_CAROUSEL_INDEX_SUCCESS,
    payload:data
});

export const SelectcarouselSlideFailure=message=>({
    type:CarouselActionTypes.SELECT_CAROUSEL_INDEX_FAILURE,
    payload:message
});