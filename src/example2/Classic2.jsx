import * as React from "react";

const validNumber = s => {
    const res = parseInt(s, 10);
    return isNaN(res) ? 0 : res;
};

function getSum(total, num) {
    return total + num;
}

export default class Classic2 extends React.Component {
    state = {sum: 0};

    values = {a: 0, b: 0};

    changed = which => e => {
        this.values[which] = validNumber(e.target.value);
        this.setState({sum: Object.values(this.values).reduce(getSum, 0)});
    };

    render() {
        return this.props.children({
            changedA: this.changed('a'),
            changedB: this.changed('b'),
            state: this.state,
        });
    }
}