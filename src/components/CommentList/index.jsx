import React, {Component} from 'react'
import toggleOpen from '../../decorators/toggleOpen'
import Comment from '../Comment'
import PropTypes from 'prop-types'
import {loadArticleComments} from '../../AC'
import Loader from '../Loader'
import {connect} from 'react-redux'

class CommentList extends Component {

    // componentWillReceiveProps({isOpen, article, loadArticleComments}) {
    //     if (!this.props.isOpen && isOpen && !article.commentsLoading && !article.commentsLoaded) {
    //         loadArticleComments(article.id)
    //     }
    // }

    componentDidUpdate(prevProps) {
        const {isOpen, article, loadArticleComments} = this.props
        if (!prevProps.isOpen && isOpen && !article.commentsLoading && !article.commentsLoaded) {
            loadArticleComments(article.id)
        }
    }

    render() {
        const {article, isOpen, toggleOpen} = this.props
        return (
            <div>
                {getButton({article, isOpen, toggleOpen})}
                {getBody({article, isOpen})}
            </div>
        )
    }
}

function getButton({article, isOpen, toggleOpen}){
    if (!article.comments.length) return null

    const btnText = isOpen ? 'Hide comments' : 'Show comments'

    return (
        <button onClick={toggleOpen}>
            {btnText}
        </button>
        
    )
}

function getBody({article: {comments = [], id, commentsLoaded, commentsLoading}, isOpen}){
    if (!isOpen) return null
    if (commentsLoading) return <Loader />
    if (!commentsLoaded) return null
    const commentElements = comments.map(id=>
        <li key={id}><Comment id = {id}/></li>
    )

    return (
        <ul>
            {commentElements}
        </ul>
    )

}

CommentList.propTypes = {
    comments: PropTypes.array,
    isOpen: PropTypes.bool,
    toggleOpen: PropTypes.func
}

export default connect(null, {loadArticleComments})(toggleOpen(CommentList))