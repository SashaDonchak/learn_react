import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'


function Pagination({ total }) {

    const paginationItems = []

    for (let i = 1; i <= Math.floor((total - 1) / 5) + 1; i++) {
        paginationItems.push(<li key={i}><NavLink to={`/comments/${i}`} activeStyle={{ color: 'red' }}>{i}</NavLink></li>)
    }

    return (
        <ul>
            {paginationItems}
        </ul>
    )
}

const mapStateToProps = state => {
    return {
        total: state.comments.total
    }
}

Pagination.propTypes = {
    // From connect
    total: PropTypes.number,
}

export default connect(mapStateToProps)(Pagination)
