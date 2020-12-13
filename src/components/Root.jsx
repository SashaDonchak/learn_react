import React from 'react'
import {Provider} from 'react-redux'
import App from './App'
import store from '../store'

function Root(props) {
    return(
        <Provider store = {store}>
            <App {...props} />
        </Provider>
    )
}

export default Root