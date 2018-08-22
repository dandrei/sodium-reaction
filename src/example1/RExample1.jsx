import * as React from 'react';
import {Fragment} from 'react';
import dataSource from './FRP1'
// import Provider from './Classic1'

const Provider = dataSource();

export default (props) => (
    <Provider>
        {({up, dn, state: {value}}) => (
            <Fragment>
                <div>
                    <button onClick={up}>+</button>
                    <button onClick={dn}>-</button>
                </div>
                <span>{value}</span>
            </Fragment>
        )}
    </Provider>
);

