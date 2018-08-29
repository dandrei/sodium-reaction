import * as React from "react";

const validNumber = s => {
    const res = parseInt(s, 10);
    return isNaN(res) ? 0 : res;
};

let id = 0;
const newKey = () => id++;

export default class Classic2 extends React.PureComponent {

    state = {count: 0, inputs: [], sum: 0};

    changeState = f => {
        this.setState(({inputs}) => {
            const nextInputs = f(inputs);
            return {
                inputs: nextInputs,
                sum: nextInputs.reduce((v, i) => v + i.value, 0),
                count: nextInputs.length
            }
        });
    };

    up = _ => this.changeState(inputs => [...inputs, {key: newKey(), value: 0}]);
    dn = _ => this.changeState(inputs => inputs.slice(0, inputs.length - 1));
    remove = key => _ => this.changeState(inputs => inputs.filter(i => i.key !== key));
    change = k => e => {
        const chg = {key: k, value: validNumber(e.target.value)};
        this.changeState(inputs => inputs.map(t => t.key === chg.key ? chg : t));
    };

    render() {
        return this.props.children({
            up: this.up,
            dn: this.dn,
            change: key => this.change(key),
            remove: key => this.remove(key),
            state: this.state,
        });
    }
}