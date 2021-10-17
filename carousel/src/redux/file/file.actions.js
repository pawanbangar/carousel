import FilesActionTypes from "./file.types";

export const fetchFilesStart=(category)=>({
    type:FilesActionTypes.FETCH_FILES_START,
    payload:category
});

export const fetchFilesSuccess=(data)=>({
    type:FilesActionTypes.FETCH_FILES_SUCCESS,
    payload:data
});

export const fetchFilesFailure=message=>({
    type:FilesActionTypes.FETCH_FILES_FAILURE,
    payload:message
});