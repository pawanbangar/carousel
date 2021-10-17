import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import categoryReducer from "./category/category.reducer";
import filesReducer from "./file/file.reducer";
import CarouselReducer from "./carousel/carousel.reducer";
const persistConfig={
    key:'root',
    storage
}

const rootReducer=combineReducers({
    category:categoryReducer,
    file:filesReducer,
    carousel:CarouselReducer
});
export default rootReducer;