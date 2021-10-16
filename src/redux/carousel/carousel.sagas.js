import {takeLatest,call,put,all} from 'redux-saga/effects';
import {AddAllFilesSuccess,AddAllFilesFailure,AddSingleFileFailure,AddSingleFilesSuccess} from './carousel.actions';
import CarouselActionTypes from "./carousel.types";
import data from "../../data/dummy";

export function* addAllFiles({payload}){

    try{
       yield put(AddAllFilesSuccess(payload));
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

export function* CarouselSagas(){
    yield all([call(AddAllFilesStart)])
}