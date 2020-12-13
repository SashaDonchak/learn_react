import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import DataRange from './DateRange'
import {selectArticles, changeDateFrom, changeDateTo} from '../../AC'
import {connect} from 'react-redux'
import {mapToArr} from '../../helpers'


class Filter extends Component{

    render() {
        const {selection, dateFrom, dateTo} = this.props.filters
        const articles = mapToArr(this.props.articles.entities)
        const options = articles.map(article=> ({
            label: article.title,
            value: article.id
        }))
        return(
            <div>
                <DataRange from = {dateFrom} to = {dateTo} handleFromChange = {this.props.changeDateFrom} handleToChange = {this.props.changeDateTo}/>
                <Select options = {options} value = {selection} onChange = {this.changeSelection} isMulti/>
            </div>
        )
    }
    changeSelection = selection => {
        this.props.selectArticles(selection)
    }
}

const mapStateToProps = state => {
    const {filters, articles} = state

    return {
        filters,
        articles
    }
}

const mapDispatchToProps = { selectArticles, changeDateFrom, changeDateTo }

export default connect(mapStateToProps, mapDispatchToProps)(Filter)