import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {increment} from '../../AC'


class Counter extends Component{

    static propTypes = {
        counter: PropTypes.number,
        increment: PropTypes.func.isRequired
    }

    render() {
        return(
            <div>
                <h2>{this.props.counter}</h2>
                <button onClick={this.handleIncrement}>Increment</button>
            </div>
        )
    }

    handleIncrement = () => this.props.increment()
    
}

const mapStateToProps = state => {
    const {count} = state
    return{
        counter: count
    }
}

const mapDispatchToProps = { increment }

export default connect(mapStateToProps, mapDispatchToProps)(Counter)