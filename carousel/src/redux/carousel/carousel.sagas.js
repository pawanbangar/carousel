import {takeLatest,call,put,all,select} from 'redux-saga/effects';
import {AddAllFilesSuccess,AddAllFilesFailure,AddSingleFileFailure,RemoveSingleFileSuccess,AddSingleFilesSuccess} from './carousel.actions';
import {selectCarouselData} from "./carousel.selectors";
import {selectFilesData} from "../file/file.selectors";
import CarouselActionTypes from "./carousel.types";

export function* addAllFiles({payload,first}){

    try{
        if(first){
            //only first 8 elements
            yield put(AddAllFilesSuccess(payload.slice(0,8)));
        }else{
            yield put(AddAllFilesSuccess(payload));
        }
    }catch(error){
        yield put(AddAllFilesFailure(error.message));
    }

}
export function* addSingleFile({payload}){

    try{
        const files=yield select(selectFilesData);
        console.log(files);
        const carousels=yield select(selectCarouselData);
        console.log(carousels);
        let file=files.filter((single)=>single.rand_id==parseInt(payload))[0];
        file.id=(Math.floor(100000 + Math.random() * 900000)).toString()+file.id;
        file.rand_id=(Math.floor(100000 + Math.random() * 900000));
      yield put(AddSingleFilesSuccess([...carousels,file]));
    }catch(error){
        yield put(AddSingleFileFailure(error.message));
    }

}
export function* removeSingleFile({payload}){

    try{
        const carousels=yield select(selectCarouselData);
        if(carousels.length>1){
            yield put(RemoveSingleFileSuccess(carousels.filter(single=>single.id!==payload)));
        }else{
            yield put(AddAllFilesFailure("Only 1 Image is in the carousel"));
        }
    }catch(error){
        yield put(AddAllFilesFailure(error.message));
    }
}

export function* AddAllFilesStart(){
    yield takeLatest(
        CarouselActionTypes.ADD_ALL_FILES_START,
        addAllFiles
    );
}
export function* addSingleFileStart(){
    yield takeLatest(
        CarouselActionTypes.ADD_SINGLE_FILE_START,
        addSingleFile
    );
}
export function* RemoveSingleFileStart(){
    yield takeLatest(
        CarouselActionTypes.REMOVE_SINGLE_FILE_START,
        removeSingleFile
    );
}

export function* CarouselSagas(){
    yield all([call(AddAllFilesStart),call(addSingleFileStart),call(RemoveSingleFileStart)])
}