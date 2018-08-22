import * as React from "react";
import {Fragment} from "react";

import dataSource from './FRP2'

const ProviderFRP = dataSource();

export default (props) => (
    <ProviderFRP>
        {({changedA, changedB, state: {sum}}) => (
            <Fragment>
                <div>
                    <input onChange={changedA}/>
                    <input onChange={changedB}/>
                </div>
                <span>{sum}</span>
            </Fragment>
        )}
    </ProviderFRP>
);