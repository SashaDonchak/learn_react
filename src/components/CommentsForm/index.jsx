import React, {Component} from 'react'
import './style.css'
import {addComment} from '../../AC'
import {connect} from 'react-redux'

class CommentsForm extends Component{

    state = {
        userName: '',
        userComment: ''
    }

    render() {
        const {userComment, userName} = this.state
        return (
            <form onSubmit = {this.handleAddComment}>
                <label>Имя: 
                    <input 
                        type="text" 
                        value = {userName} 
                        name = 'userName' 
                        onChange = {this.handleChangeInput} 
                        className = {this.getClassName('userName')}
                    />
                </label>
                <label>Комментарий:
                    <textarea 
                        onChange = {this.handleChangeInput} 
                        name = 'userComment' 
                        value = {userComment} 
                        className = {this.getClassName('userComment')}
                    ></textarea>
                </label>
                <button type="submit">Оставить комментарий</button>      
            </form>
        )
    }

    getClassName = type => {
        return this.state[type].length && this.state[type].length < limits[type].min ? 'error' : ''
    }

    handleChangeInput = ev => {
        const {name, value} = ev.target

        if (value.length > limits[name].max) return

        this.setState({
            [name]: value
        })
    }

    handleAddComment = ev => {
        ev.preventDefault()
        if (this.getClassName('userName') === '' && this.getClassName('userComment') === ''){
            const {userComment, userName} = this.state
            this.props.addComment(userName, userComment, this.props.articleId)
    
            this.setState({
                userName: '',
                userComment: ''
            })
        }
    }
}

const limits = {
    userName: {
        min: 5,
        max: 20
    },
    userComment: {
        min: 15,
        max: 50
    }
}

export default connect(null, { addComment })(CommentsForm)