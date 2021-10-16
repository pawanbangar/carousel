import {takeLatest,call,put,all,select} from 'redux-saga/effects';
import {AddAllFilesSuccess,AddAllFilesFailure,AddSingleFileFailure,RemoveSingleFileSuccess,AddSingleFilesSuccess} from './carousel.actions';
import {selectCarouselData} from "./carousel.selectors";
import {selectFilesData} from "../file/file.selectors";
import CarouselActionTypes from "./carousel.types";
import data from "../../data/dummy";

export function* addAllFiles({payload}){

    try{
       yield put(AddAllFilesSuccess(payload));
    }catch(error){
        yield put(AddAllFilesFailure(error.message));
    }

}
export function* addSingleFile({payload}){

    try{
        const files=yield select(selectFilesData);
        const carousels=yield select(selectCarouselData);
        const file=files.filter((single)=>single.id===payload)[0];
      yield put(AddSingleFilesSuccess([...carousels,file]));
    }catch(error){
        yield put(AddAllFilesFailure(error.message));
    }

}
export function* removeSingleFile({payload}){

    try{
        const carousels=yield select(selectCarouselData);
        const id=carousels[parseInt(payload)].id;
        carousels.splice(payload, 1)
      yield put(RemoveSingleFileSuccess(carousels));
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
export function* AddSingleFileStart(){
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
    yield all([call(AddAllFilesStart),call(AddSingleFileStart),call(RemoveSingleFileStart)])
}