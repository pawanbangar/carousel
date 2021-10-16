import FilesActionTypes from "./file.types";

export const fetchFilesStart=(category)=>({
    type:FilesActionTypes.FETCH_FILES_START,
    category:category
});

export const fetchFilesSuccess=collectionMap=>({
    type:FilesActionTypes.FETCH_FILES_SUCCESS,
    payload:collectionMap
});

export const fetchFilesFailure=message=>({
    type:FilesActionTypes.FETCH_FILES_FAILURE,
    payload:message
});
export const fetchFilesStartAsync=(category)=>{
    return dispatch=>{
        // const collectionRef=firestore.collection('collections');
        // dispatch(fetchCategoriesStart());
        //
        // collectionRef.get().then(snapshot=>{
        //     const collectionsMap=convertCollectionsSnapshotToMap(snapshot);
        //     dispatch(fetchCollectionSuccess(collectionsMap));
        // });
        dispatch(fetchFilesStart(category));

        dispatch(fetchFilesSuccess({
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