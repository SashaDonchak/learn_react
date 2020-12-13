import { combineReducers } from 'redux'
import CountReducer from './counter'
import articles from './articles'
import filters from './filters'
import comments from './comments'


export default combineReducers({
    count: CountReducer,
    articles,
    filters,
    comments
})