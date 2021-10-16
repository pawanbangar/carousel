import {takeLatest,call,put,all} from 'redux-saga/effects';
import {fetchCategoriesSuccess,fetchCategoriesFailure} from './category.actions';
import {fetchFilesStart} from "../file/file.actions";
import CategoryActionTypes from "./category.types";
import {fetchCategories} from "../../api/apis"
export function* fetchCollectionsAsync(){
    try{
       const data= yield fetchCategories();
        yield put(fetchCategoriesSuccess(data));
    }catch(error){
        yield put(fetchCategoriesFailure(error.message));
    }

}

export function* setupFiles({payload}) {
    try{
        const firstcategory=Object.keys(payload)[0];
        yield put(fetchFilesStart(firstcategory));
    }catch(error){
        console.log(error);
        yield put(fetchCategoriesFailure(error.message));
    }
}

export function* fetchCategoriesStart(){
    yield takeLatest(
        CategoryActionTypes.FETCH_CATEGORIES_START,
        fetchCollectionsAsync
    );
}
export function* onCategoriesFetchSuccess(){
    yield takeLatest(
        CategoryActionTypes.FETCH_CATEGORIES_SUCCESS,
        setupFiles
    );
}

export function* CategorySagas(){
    yield all([call(fetchCategoriesStart),call(onCategoriesFetchSuccess)])
}