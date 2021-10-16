import {takeLatest,call,put,all} from 'redux-saga/effects';
import {fetchCategoriesSuccess,fetchCategoriesFailure} from './category.actions';
import {fetchFilesStart} from "../file/file.actions";
import CategoryActionTypes from "./category.types";
export function* fetchCollectionsAsync(){
    try{
       // const collectionsMap=yield call(convertCollectionsSnapshotToMap,snapshot);
        yield put(fetchCategoriesSuccess({
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