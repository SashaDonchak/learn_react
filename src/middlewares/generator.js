import { ADD_COMMENT } from '../constants'
import {v4 as uuidv4} from 'uuid'

export default state => next => action => {
    if (!action.generateId) return next(action) 
    next({
        ...action,
        payload: {
            ...action.payload,
            randomId: uuidv4()
        }
    }) 
} 