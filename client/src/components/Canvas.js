import React, { useEffect, useRef } from 'react'

const Canvas = (props) => {
    const canvasRef = useRef()
    
    useEffect(() => {
        if (props.pixels == null) return

        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')

        const arr = new Uint8ClampedArray(props.pixels)
        const img = new ImageData(arr, 500, 500)
        
        ctx.msImageSmoothingEnabled = false
        ctx.imageSmoothingEnabled = false
        ctx.webkitImageSmoothingEnabled = false
        ctx.mozImageSmoothingEnabled = false

        
        createImageBitmap(img).then(c => {
            ctx.drawImage(c, props.shift[0], props.shift[1], 500 * props.scale, 500 * props.scale) 
        })

        return () => {ctx.clearRect(0, 0, canvas.width, canvas.height)}

    }, [props.shift, props.scale])

    useEffect(() => {
        if (props.lastPixel == null || canvasRef.current == null) return

        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')

        let c = props.lastPixel.color

        ctx.fillStyle = `rgb(${c.r}, ${c.g}, ${c.b})`
        ctx.fillRect(props.shift[0] + props.lastPixel.x * props.scale, props.shift[1] + props.lastPixel.y * props.scale, props.scale, props.scale)
    }, [props.lastPixel])

    return (
        <canvas 
        className='canvas'
        id='canvas'
        height={props.size[1]}
        width={props.size[0]}
        onClick={e => {
            console.log(e)
            props.canvasClickHandler(e)}}
        ref={canvasRef}
        ></canvas>
    )
}

export default Canvas