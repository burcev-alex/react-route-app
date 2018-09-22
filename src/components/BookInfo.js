import React from 'react'
import {PropTypes} from 'prop-types'

export const BookInfo = ({data}) => {
    return (
        <React.Fragment>
            <h2>{data.name}</h2>
            <img src={data.imgUrl} width={100} />
            <p>{data.description}</p>
        </React.Fragment>
    )
}

BookInfo.data = {
    data: PropTypes.shape({
        imgUrl: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
    }).isRequired
}