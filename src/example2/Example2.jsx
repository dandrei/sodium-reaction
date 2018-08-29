import * as React from "react";
import {Fragment} from "react";
// import Provider from './Classic2'
import dataSource from './FRP2'

const Provider = dataSource();

export default (props) => (
    <Provider>
        {({changedA, changedB, state: {sum}}) => (
            <Fragment>
                <div>
                    <input onChange={changedA}/>
                    <input onChange={changedB}/>
                </div>
                <span>{sum}</span>
            </Fragment>
        )}
    </Provider>
);