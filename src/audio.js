import React from 'react'
import { ReactMic } from 'react-mic';
import Button from '@material-ui/core/Button';
import './audio.css'
function Audio() {
    

    return (
        <div className='audio'>
             <Button variant="contained" color="primary"   className='start'>Start</Button>
             <Button variant="contained" color="primary"  className='stop'>Stop</Button>
             <Button variant="contained" color="primary"  className='download'>Download</Button>
        </div>
    )
}

export default Audio
