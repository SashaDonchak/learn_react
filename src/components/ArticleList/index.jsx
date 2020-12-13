import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {filteredArticles} from '../../selectors'
import {loadAllArticles} from '../../AC'
import Loader from '../Loader'
import {NavLink} from 'react-router-dom'

class ArticleList extends Component {

    static propTypes = {
        //from connect
        articles: PropTypes.array,
        filters: PropTypes.object,
        // from accordion
        openArticleId: PropTypes.string,
        toggleOpenArticle: PropTypes.func
    }

    componentDidMount() {
        const {loadAllArticles, loading, loaded} = this.props
        if (!loading && !loaded) loadAllArticles()
    }

    render() {
        const {articles, loading} = this.props
        if (loading) return <Loader />
        const articleElements = articles.map(article=> 
        <li key ={article.id} >
            <NavLink activeStyle = {{color: 'red'}} to = {`/articles/${article.id}`}>
                {article.title}
            </NavLink>   
        </li>
        )

        return(
            <ul>
                {articleElements}
            </ul>
        )
    }
}


const mapStateToProps = state => {
    return {
        articles: filteredArticles(state),
        loading: state.articles.loading,
        loaded: state.articles.loaded,
    }
}

export default connect(mapStateToProps, {loadAllArticles})(ArticleList)