import React, { useEffect, useState, useLayoutEffect, useRef } from 'react'
import Canvas from './Canvas'
import PixelCursor from './PixelCursor'



const PaintPlace = (props) => {

    const [scale, setScale] = useState(1) // zoom
    const [drag, setDrag] = useState(false) // is dragging
    const [shift, setShift] = useState([100, 100]) // mouse delta moves
    const [cursor, setCursor] = useState('default')
    const [size, setSize] = useState([0, 0])
    



    const placeRef = useRef(null)

    function canvasClickHandler(e) {
        let x = Math.floor((e.clientX - shift[0]) / (scale))
        let y = Math.floor((e.clientY - shift[1]) / (scale))
        if (x > 499) x = 499
        else if (x < 0) x = 0
        if (y > 499) y = 499
        else if (y < 0) y = 0 
        props.setChosenPixel([x, y])
    }
    
    function zoomHandler(e) {

        // let cX = shift[0] - 250 * Math.sign(e.deltaY)
        // let cY = shift[1] - 250 * Math.sign(e.deltaY)
        // setShift([cX, cY])

        if (e.deltaY < 0) return setScale(scale * 1.1)
        if (e.deltaY > 0) return setScale(scale / 1.1)
    }

    // on drag set shift with mouse delta moves

    // useEffect(() => {
    //     console.log(shift)
    //     if (shift[0] * scale < 500) return setShift([500,shift[1]])
    // }, [scale, shift])

    useEffect(() => {
        if (drag && cursor !== 'move') return setCursor('move')
        if (cursor !== 'default') return setCursor('default')
    }, [drag])

    useLayoutEffect(() => {
        if (placeRef == null) return
        setSize([placeRef.current.clientWidth, placeRef.current.clientWidth])
    }, [])

    useEffect(() => {
        function resizeHandle() {
            // if (window == null) return
            setSize([placeRef.current.clientWidth, placeRef.current.clientHeight])
        }
        window.addEventListener('resize', resizeHandle)
        return () => {window.removeEventListener('resize', resizeHandle)}
    })



    // correct shift depending on scale and prevent from getting canvas out from screen 
    // useLayoutEffect(() => {
    //     if (0 < shift[0] || shift[0] < -500) setShift([250 *(Math.sign(shift[0]) - 1), shift[1]])
    //     if (500 < shift[1] || shift[1] < 0) setShift([shift[0], 250 *(Math.sign(shift[1]) + 1)])
    // }, [shift])

    // prevent from over-scaling
    useEffect(() => {
        if (scale > 40) setScale(40)
        if (scale < 1) setScale(1)
    }, [scale])




    return (
    <div 
    className='paintplace'
    onWheel={e => zoomHandler(e)}
    onMouseMove={e => {
        if (drag) setShift([shift[0] + e.movementX, shift[1] + e.movementY])
        e.preventDefault()
        e.stopPropagation()
    }}
    onMouseDown={e => {
        setDrag(true)
        e.preventDefault()
        e.stopPropagation()
    }}
    onMouseUp={e => {
        setDrag(false)
        e.preventDefault()
        e.stopPropagation()
    }}
    onMouseLeave={e => {
        setDrag(false)
        e.preventDefault()
        e.stopPropagation()
    }}
    style={{cursor: cursor}}
    ref={placeRef}
    onDoubleClick={e => {props.placePixel()}}
    >
        <Canvas  shift={shift} scale={scale} size={size} canvasClickHandler={canvasClickHandler} pixels={props.pixels} lastPixel={props.lastPixel}/>
        <PixelCursor shift={shift} scale = {scale} size={size} chosenPixel={props.chosenPixel} color={props.color}/>
    </div>
    )
    
}

export default PaintPlace