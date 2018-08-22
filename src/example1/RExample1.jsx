import * as React from 'react';
import {Fragment} from 'react';
import dataSource from './FRP1'
import ProviderClassic from './Classic'

const ProviderFRP = dataSource();

export default (props) => (
    <ProviderFRP>
        {({up, dn, state: {value}}) => (
            <Fragment>
                <div>
                    <button onClick={up}>+</button>
                    <button onClick={dn}>-</button>
                </div>
                <span>{value}</span>
            </Fragment>
        )}
    </ProviderFRP>
);

