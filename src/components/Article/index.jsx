import React ,{ Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {deleteArticle, loadAllArticles, loadArticle} from '../../AC'
import CommentList from '../CommentList'
import CommentsForm from '../CommentsForm'
import Loader from '../Loader'

class Article extends Component {

    PropTypes = {
        id: PropTypes.string.isRequired,
        isOpen: PropTypes.bool,
        toggleOpen: PropTypes.func,
        // from connect
        article: PropTypes.shape({
            id: PropTypes.string,
            title: PropTypes.string,
            text: PropTypes.string,
            comments: PropTypes.array
        }),
    }

    // componentWillReceiveProps({isOpen, loadArticle, article}) {
    //     if (isOpen && !article.text && !article.loading) loadArticle(article.id)
    // }

    componentDidMount() {
        const {loadArticle, article, id} = this.props
        if (!article || (!article.text && !article.loading)) loadArticle(id)
    }

    render() {
        const {article, isOpen, toggleOpen} = this.props
        if (!article) return null
        return (
            <div>
                <h2>{article.title}</h2>
                <button onClick = {toggleOpen}>
                    {isOpen ? 'close' : 'open'}
                </button>
                <button onClick = {this.handleDelete}>Delete me</button>
                {this.getBody()}
            </div>
        )
    }
    

    getBody (){
        const {article, isOpen} = this.props
        if (!isOpen) return null
        if (article.loading) return <Loader />
        return (
            <div key = {article.id}>
                <div>{article.text}</div>
                <CommentList article={article}/>
                <CommentsForm articleId = {article.id}/>
            </div>
        )
    }

    handleDelete = () => {
        const {deleteArticle, article} = this.props
        deleteArticle(article.id)
    }
}

export default connect((state, ownProps) => ({
    article: state.articles.entities.get(ownProps.id)
}), { deleteArticle, loadArticle })(Article)