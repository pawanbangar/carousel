import FilesActionTypes from "./file.types";

const INITIAL_STATE={
    files:[],
    category:"",
    isFetching:false,
    errorMessage:undefined
};

const filesReducer=(state=INITIAL_STATE,action)=>{
    switch(action.type){
        case FilesActionTypes.FETCH_FILES_START:
            return{
                ...state,
                errorMessage: undefined,
                category: action.category,
                isFetching:true
            }
        case FilesActionTypes.FETCH_FILES_SUCCESS:
            return{
                ...state,
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