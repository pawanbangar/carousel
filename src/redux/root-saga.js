import {all,call} from 'redux-saga/effects';
 import {fetchCollectionsAsync} from './category/category.sagas';
 import {CategorySagas} from './category/category.sagas';
import {FilesSagas} from "./file/file.sagas";
import {CarouselSagas} from "./carousel/carousel.sagas";
export default function* rootSaga(){
    yield all([call(fetchCollectionsAsync),call(CategorySagas),call(FilesSagas),call(CarouselSagas)]);
}