import {normalizedArticles as defaultArticles} from '../fixtures'
import {ADD_COMMENT, DELETE_ARTICLE, LOAD_ALL_ARTICLES, START, SUCCESS, LOAD_ARTICLE, FAIL, LOAD_ARTICLE_COMMENTS} from '../constants'
import {arrToMap} from '../helpers'
import {OrderedMap, Record} from 'immutable'

const ArticleRecord = Record({
    text: undefined,
    title: '',
    id: undefined,
    loading: false,
    comments: [],
    commentsLoading: false,
    commentsLoaded: false
})

const ReducerState = Record({
    loaded: false,
    loading: false,
    entities: new OrderedMap({})
})

const defaultState = new ReducerState()

export default (articles = defaultState, action) => {
    const {type, payload, response} = action

    switch(type) {
        case DELETE_ARTICLE:
            return articles.deleteIn(['entities', payload.id])

        case ADD_COMMENT:
            return articles.updateIn(['entities', payload.article, 'comments'], comments => comments.concat(payload.randomId))

        case LOAD_ALL_ARTICLES + START:
            return articles.set('loading', true)    

        case LOAD_ALL_ARTICLES + SUCCESS:
            return articles
                    .set('entities', arrToMap(response, ArticleRecord))
                    .set('loading', false)
                    .set('loaded', true)

        case LOAD_ARTICLE + START:
            return articles.setIn(['entities', payload.id, 'loading'], true)

        case LOAD_ARTICLE + SUCCESS:
            return articles.setIn(['entities', payload.id], new ArticleRecord(payload.response))

        case LOAD_ARTICLE + FAIL:
            return articles

        case LOAD_ARTICLE_COMMENTS + START:
            return articles.setIn(['entities', payload.articleId, 'commentsLoading'], true)
            
        case LOAD_ARTICLE_COMMENTS + SUCCESS:
            return articles
                    .setIn(['entities', payload.articleId, 'commentsLoading'], false)  
                    .setIn(['entities', payload.articleId, 'commentsLoaded'], true)    
    }

    return articles
}