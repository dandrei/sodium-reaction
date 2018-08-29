import * as React from "react";
import {Fragment} from "react";
// import Provider from './Classic2'
import dataSource from './FRP3'

const Provider = dataSource();

export default (props) => (
    <Provider>
        {({up, dn, change, remove, state: {count, inputs, sum}}) => (
            <Fragment>
                <div>
                    <button onClick={up}>+</button>
                    <button onClick={dn}>-</button>
                </div>
                <div>
                    Inputs: {count} Sum: {sum}
                </div>
                <Fragment>
                    {inputs.map(({key, value}) => <div>
                        <input value={value} key={key} onChange={change(key)}/>
                        <button onClick={remove(key)}>x</button>
                    </div>)}
                </Fragment>
            </Fragment>
        )}
    </Provider>
);