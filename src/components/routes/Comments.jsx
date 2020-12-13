import React from 'react'
import PropTypres from 'prop-types'
import { Route, Redirect } from 'react-router-dom'
import CommentsPage from '../CommentsPage'


function Comments({ match }) {
    console.log(match)

    if (match.isExact) return <Redirect to='/comments/1' />
    return <Route path='/comments/:page' render={getCommentsPage} />
}

function getCommentsPage({match}) {
    return <CommentsPage page = {match.params.page} />
}


export default Comments