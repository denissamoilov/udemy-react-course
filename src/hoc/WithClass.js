import React, { Component } from 'react';

// const withClass = (WrapperdComponent, className) => {
//     return (props) => (
//         <div className={className}>
//             <WrapperdComponent {...props} />
//         </div>
//     )
// }

const withClass = (WrapperdComponent, className) => {
    const WithClass = class extends Component {
        render() {
            return (
                <div className={className}>
                    <WrapperdComponent ref={this.props.forwardedRef} {...this.props} />
                </div>
            )
        }
    }

    return React.forwardRef((props, ref) => {
        return <WithClass {...props} forwardedRef={ref} />
    })
}

export default withClass;