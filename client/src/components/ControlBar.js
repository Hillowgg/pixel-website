import React from 'react'
import ColorPicker from './colorPicker'

export default function ControlBar (props) {

    function downloadCanvas() {
        var canvas = document.getElementById('canvas');
        let link = document.createElement('a')
        link.setAttribute('download', 'canvas.png');
        link.setAttribute('href', canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"));
        link.click()
    }


    return (
    <div className='controlbar'>
        <ColorPicker {...props}/>
        <button 
        className='placebutton'
        onClick={e => props.placePixel()}
        >Поставить пиксель!</button>
        <div className='coordinates'>{props.chosenPixel[0]},{props.chosenPixel[1]}</div>
        <button className='download'
        onClick={e => downloadCanvas()}
        >Скачать полотно</button>
    </div>
    )
}
