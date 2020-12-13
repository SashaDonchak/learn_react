import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {commentSelectorFactory} from '../../selectors'

function Comment({comment}){
    return (
        <div>
            <h3>{comment.user}</h3>
            <div>{comment.text}</div>
        </div>
    )
}

Comment.propTypes = {
    id: PropTypes.string,
    // From connect
    comment: PropTypes.shape({
        user: PropTypes.string,
        text: PropTypes.string
    })
}

const mapStateToProps = () => {
    const commentSelector = commentSelectorFactory()
    return (state, ownProps) => {
        return {
            comment: commentSelector(state, ownProps)
        }
    }
}


export default connect(mapStateToProps)(Comment)