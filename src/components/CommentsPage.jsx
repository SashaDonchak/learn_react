import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Comment from './Comment'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import Pagination from './Pagination'
import Loader from './Loader'
import { loadCommentsPage } from '../AC'

class CommentsPage extends Component {

    PropTypes = {
        page: PropTypes.number.isRequired
    }

    componentWillMount() {
        this.props.loadCommentsPage(this.props.page)
    }

    componentWillReceiveProps({ page, loadCommentsPage }) {
        loadCommentsPage(page)
    }

    render() {
        const { page } = this.props

        return (
            <div>
                {`Comments | page ${page}`}
                {this.getCommentsItems()}
                <Pagination />
            </div>
        )
    }

    getCommentsItems() {
        const { comments, loading } = this.props
        if (loading || !comments) return <Loader />
        const commentItems = comments.map(id => <li key={id}><Comment id={id} /></li>)
        return <ul>{commentItems}</ul>
    }
}

const mapStateToProps = (state, { page }) => {
    const { total, pagination } = state.comments
    return {
        total,
        loading: pagination.getIn([page, 'loading']),
        comments: pagination.getIn([page, 'ids'])
    }
}

export default connect(mapStateToProps, { loadCommentsPage })(CommentsPage)