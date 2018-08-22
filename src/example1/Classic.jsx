import * as React from "react";


export default class Classic extends React.Component {

    state = {
        value: 0
    };

    up = () => {
        this.setState(prevState => ({value: prevState.value + 1}));
    };

    dn = () => {
        this.setState(prevState => ({value: prevState.value - 1}));
    };

    render() {
        return this.props.children({
            up: this.up,
            dn: this.dn,
            state: this.state,
        });
    }
}