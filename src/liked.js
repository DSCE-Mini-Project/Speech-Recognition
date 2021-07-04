import React from 'react'
import {useDataLayerValue} from './DataLayer';
function Liked() {
    const[{uid},dispatch]=useDataLayerValue();
    return (
        <div>
            <h1>{uid}</h1>
        </div>
    )
}

export default Liked
