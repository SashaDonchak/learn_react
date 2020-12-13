import {SELECT_ARTICLES, CHANGE_DATE_FROM, CHANGE_DATE_TO} from '../constants'

const initialFilters = {
    dateFrom: undefined,
    dateTo: undefined,
    selection: []
}

export default (filters = initialFilters, action) => {
    const {type, payload} = action

    switch(type) {
        case SELECT_ARTICLES:
            return {
                ...filters,
                selection: payload.selection 
            }
        
        case CHANGE_DATE_FROM:
            return {
                ...filters,
                dateFrom: payload.dateFrom
            }

        case CHANGE_DATE_TO:
            return {
                ...filters,
                dateTo: payload.dateTo
            }
        
    }

    return filters
}