import {createSelector} from 'reselect'
import {mapToArr} from '../helpers'

const filtersGetter = state => state.filters
const articlesGetter = state => state.articles.entities

const idGetter = (state, props) => props.id
const commentsGetter = state => state.comments.entities

export const filteredArticles = createSelector(articlesGetter, filtersGetter, (articles, filters) => {
    const selectedIds = filters.selection ? filters.selection.map(article=>(article.value)) : []

    return mapToArr(articles).filter(article => {
        const published = Date.parse(article.date)
        return (
            !selectedIds.length || selectedIds.includes(article.id) && 
            (!filters.dateFrom || !filters.dateTo || (published > Date.parse(filters.dateFrom) && published < Date.parse(filters.dateTo)))
            )
    })
})

export const commentSelectorFactory = () => createSelector(idGetter, commentsGetter, (id, comments) => {
    return comments.get(id)
})