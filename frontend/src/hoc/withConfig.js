import React from 'react';
import config from '../config.js'

export const withConfig = Component => props => {
    return (
        <Component {...config} {...props} />
    )
}
