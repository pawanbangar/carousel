import FilesActionTypes from "./file.types";

const INITIAL_STATE={
    files:[],
    isFetching:false,
    errorMessage:undefined
};

const filesReducer=(state=INITIAL_STATE,action)=>{
    switch(action.type){
        case FilesActionTypes.FETCH_FILES_START:
            return{
                ...state,
                errorMessage: undefined,
                isFetching:true
            }
        case FilesActionTypes.FETCH_FILES_SUCCESS:
            return{
                isFetching:false,
                errorMessage: undefined,
                files:action.payload
            }
        case FilesActionTypes.FETCH_FILES_FAILURE:
            return{
                ...state,
                isFetching:false,
                errorMessage:action.payload
            }
        default:
            return state;
    }
}

export default filesReducer;