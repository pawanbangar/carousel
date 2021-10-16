import {takeLatest,call,put,all,select} from 'redux-saga/effects';
import {fetchFilesSuccess,fetchFilesFailure} from './file.actions';
import FilesActionTypes from "./file.types";
import {selectCategoriesAsCollection} from "../category/category.selectors";
import {AddAllFilesStart} from "../carousel/carousel.actions"
import {FetchPhotosByCategory} from "../../api/apis"
export function* fetchCollectionsAsync({payload}){

    try{
         const categories=yield select(selectCategoriesAsCollection);
         const data=yield FetchPhotosByCategory(categories.filter(category=>category.name===payload)[0]);
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