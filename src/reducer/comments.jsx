import {normalizedComments as defaultComments} from '../fixtures'
import {ADD_COMMENT, LOAD_ARTICLE_COMMENTS, START, FAIL, SUCCESS, LOAD_ALL_COMMENTS, LOAD_COMMENTS_PAGE} from '../constants'
import {arrToMap} from '../helpers'
import {OrderedMap, Record, Map} from 'immutable'

const CommentRecord = Record({
    id: undefined,
    user: '',
    text: undefined,
}) 

const ReducerState = Record({
    entities: new OrderedMap({}),
    total: null,
    pagination: new Map({}),
})

const defaultState = new ReducerState()

export default (comments = defaultState, action) => {
    const {type, payload, response} = action

    switch(type) {
        case ADD_COMMENT: 
            return comments
                        .set('total', comment.get('total') + 1)
                        .setIn(['entities', payload.randomId], new CommentRecord({
                            id: payload.randomId,
                            user: payload.author,
                            text: payload.comment
                        }))

        case LOAD_ARTICLE_COMMENTS + SUCCESS:
            return comments.update('entities', entities => entities.merge(arrToMap(response, CommentRecord)))

        case LOAD_COMMENTS_PAGE + START:
            return comments.setIn(['pagination', payload.page, 'loading'], true)    
        
        case LOAD_COMMENTS_PAGE + SUCCESS:
            return comments
                        .setIn(['pagination', payload.page, 'loading'], false)
                        .setIn(['pagination', payload.page, 'ids'], response.records.map(comment => comment.id))
                        .set('total', response.total)
                        .mergeIn(['entities'], arrToMap(response.records, CommentRecord))
    }

    return comments
}