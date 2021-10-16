import {takeLatest,call,put,all} from 'redux-saga/effects';
import {fetchFilesSuccess,fetchFilesFailure} from './file.actions';
import FilesActionTypes from "./file.types";
import data from "../../data/dummy";
import {AddAllFilesStart} from "../carousel/carousel.actions"

export function* fetchCollectionsAsync(){

    try{

        // const collectionsMap=yield call(convertCollectionsSnapshotToMap,snapshot);
        yield put(fetchFilesSuccess(data));
    }catch(error){
        yield put(fetchFilesFailure(error.message));
    }

}
export function* SetupCarousel({payload}){

    try{
        yield put(AddAllFilesStart(payload));
    }catch(error){
        yield put(fetchFilesFailure(error.message));
    }

}

export function* fetchFilesStart(){
    yield takeLatest(
        FilesActionTypes.FETCH_FILES_START,
        fetchCollectionsAsync
    );
}
export function* OnAllFilesAddSuccess(){
    yield takeLatest(
        FilesActionTypes.FETCH_FILES_SUCCESS,
        SetupCarousel
    );
}

export function* FilesSagas(){
    yield all([call(fetchFilesStart),call(OnAllFilesAddSuccess)])
}