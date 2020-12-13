import React, {Component as ReactComponent} from 'react'

export default (OriginalComponent) => class Accordion extends ReactComponent {
    
    state = {
        openItemId: null
    }

    render() {
        return(
            <OriginalComponent {...this.props} openArticleId = {this.state.openItemId} toggleOpenArticle = {this.toggleOpen} />
        )
    }

    toggleOpen = (openItemId) => () => {
        this.setState({
            openItemId: openItemId === this.state.openItemId ? null : openItemId
        })        
    }
}