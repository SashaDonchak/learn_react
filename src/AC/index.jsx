import {
    DELETE_ARTICLE,
    INCREMENT,
    SELECT_ARTICLES,
    CHANGE_DATE_FROM,
    CHANGE_DATE_TO,
    ADD_COMMENT,
    LOAD_ALL_ARTICLES,
    LOAD_ARTICLE,
    START,
    SUCCESS,
    FAIL,
    LOAD_ARTICLE_COMMENTS,
    LOAD_ALL_COMMENTS,
    LOAD_COMMENTS_PAGE,
} from '../constants'

export function increment() {
    return {
        type: INCREMENT
    }
}

export function deleteArticle(id) {
    return {
        type: DELETE_ARTICLE,
        payload: { id }
    }
}

export function selectArticles(selection) {
    return {
        type: SELECT_ARTICLES,
        payload: { selection }
    }
}

export function changeDateFrom(dateFrom) {
    return {
        type: CHANGE_DATE_FROM,
        payload: { dateFrom }
    }
}

export function changeDateTo(dateTo) {
    return {
        type: CHANGE_DATE_TO,
        payload: { dateTo }
    }
}

export function addComment(author, comment, article) {
    return {
        type: ADD_COMMENT,
        payload: { author, comment, article },
        generateId: true,
    }
}

export function loadAllArticles() {
    return {
        type: LOAD_ALL_ARTICLES,
        callAPI: '/api/article'
    }
}

export function loadArticle(id) {
    return (dispatch) => {
        dispatch({
            type: LOAD_ARTICLE + START,
            payload: { id }
        })

        setTimeout(() => {
            fetch(`/api/article/${id}`)
                .then(res => res.json())
                .then(response => dispatch({
                    type: LOAD_ARTICLE + SUCCESS,
                    payload: { id, response }
                }))
                .catch(error => dispatch({
                    type: LOAD_ARTICLE + FAIL,
                    payload: { id, error }
                }))
        }, 1000)


    }
}

export function loadArticleComments(articleId) {
    return {
        type: LOAD_ARTICLE_COMMENTS,
        payload: { articleId },
        callAPI: `/api/comment?article=${articleId}`
    }
}

export function loadCommentsPage(page) {
    return (dispatch, getState) => {
        const { comments: { pagination } } = getState()
        if (pagination.getIn([page, 'loading']) || pagination.getIn([page, 'ids'])) return

        dispatch({
            type: LOAD_COMMENTS_PAGE,
            payload: { page },
            callAPI: `/api/comment?limit=5&offset=${(page - 1) * 5}`
        })
    }
}