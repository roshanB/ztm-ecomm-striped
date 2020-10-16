import React from 'react';
import './error-boundary.styles.scss';

export default class ErrorBoundary extends React.Component {
    state = {
        hasErrored: false
    }

    // Tried_static_else_error  
    static getDerivedStateFromError(error) {
        // process error here
        console.log('getDerivedStateFromError: ', error);
        return { hasErrored: true}; //Tried_returning_state_object - state will be updated automatically
    }

    // Tried_error_and_info
    componentDidCatch(error, info) {
        console.log('componentDidCatch: ', error, info);
    }

    render() {
        // Tried_return_error-handling_html_or_component
        if(this.state.hasErrored) {
            return (<div className="error-image-overlay">
                <div className="error-image-container"></div>
                <div className="error-image-text">Something went terribly wrong!!</div>
            </div>);
        }
        // Tried_since_children_component_will_be_wrapped - written children
        return this.props.children;
    }
}

