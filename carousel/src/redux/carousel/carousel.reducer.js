import CarouselActionTypes from "./carousel.types";

const INITIAL_STATE={
    files:[],
    selected:0,
    isAdding:false,
    errorMessage:undefined
};

const CarouselReducer=(state=INITIAL_STATE,action)=>{
    switch(action.type){
        case CarouselActionTypes.ADD_ALL_FILES_START:
            return{
                ...state,
                errorMessage: undefined,
                isAdding:true
            }
        case CarouselActionTypes.ADD_ALL_FILES_SUCCESS:
            return{
                ...state,
                isAdding:false,
                errorMessage: undefined,
                files:action.payload
            }
        case CarouselActionTypes.ADD_ALL_FILES_FAILURE:
            return{
                ...state,
                isAdding:false,
                errorMessage:action.payload
            }
        case CarouselActionTypes.ADD_SINGLE_FILE_START:
            return{
                ...state,
                isAdding:true,
                errorMessage:undefined
            }
        case CarouselActionTypes.ADD_SINGLE_FILE_SUCCESS:
            return{
                ...state,
                isAdding:false,
                files:action.payload
            }
        case CarouselActionTypes.REMOVE_SINGLE_FILE_SUCCESS:
            return{
                ...state,
                isAdding:false,
                files:action.payload
            }
        default:
            return state;
    }
}

export default CarouselReducer;