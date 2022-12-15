import React, { useEffect, useState } from 'react'



export default function PixelCursor (props) {
    // const [pos, setPos] = useState(props.shift)
    const [vPos, setVPos] = useState(props.shift)

    useEffect(() => {
        setVPos([props.shift[0] + props.chosenPixel[0] * props.scale, props.shift[1] + props.chosenPixel[1] * props.scale])
    }, [props.chosenPixel, props.scale, props.shift])

    return (
        <div 
        className = 'pixelcursor'
        style = {{
            top: vPos[1],
            left: vPos[0],
            height: props.scale * props.size[0] / 1500,
            width: props.scale * props.size[1] / 1500,
            border: `${props.scale / 10}px solid #000`,
            backgroundColor: `rgb(${props.color.r}, ${props.color.g}, ${props.color.b})`
        }}
        ></div>
    )
}