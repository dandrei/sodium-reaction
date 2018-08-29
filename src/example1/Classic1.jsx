import * as React from "react";


export default class Classic1 extends React.PureComponent {
    state = {value: 0};

    add = delta => () => this.setState(prevState => ({value: prevState.value + delta}));

    render() {
        return this.props.children({
            up: this.add(1),
            dn: this.add(-1),
            state: this.state,
        });
    }
}