import PaintPlace from './components/PaintPlace'
import ControlBar from './components/ControlBar'
import { useState, useEffect } from 'react'
import { io } from 'socket.io-client'

function App() {

  const [color, setColor] = useState({r: 255, g:255, b: 255, a: 1})
  const [socket, setSocket] = useState()
  const [pixels, setPixels] = useState(null)
  const [chosenPixel, setChosenPixel] = useState([0, 0])
  const [lastPixel, setLastPixel] = useState(null)

  function placePixel () {
    if (socket == null) return
    let [x, y] = chosenPixel
    let p = pixels
    let offset = (y * 500 + x) * 4
    if (p[offset] === color.r && p[offset + 1] === color.g && p[offset + 2] === color.b) return false

    socket.emit('place-pixel', {x, y, color})

    p[offset] = color.r
    p[offset + 1] = color.g
    p[offset + 2] = color.b
    setPixels(p)
    setLastPixel({x, y, color})
  }

  useEffect(() => {

    const s = io('http://localhost:8080') // 178.154.203.173

    setSocket(s)

    return () => {
        s.disconnect()
    }
  }, [])


  useEffect(() => {
    if (socket == null || pixels == null) return

    const handlePixel = ({x, y, color}) => {
      let p = pixels
      let offset = (y * 500 + x) * 4

      p[offset] = color.r
      p[offset + 1] = color.g
      p[offset + 2] = color.b
      setPixels(p)
      setLastPixel({x, y, color})
    }
    
    socket.on('receive-pixel', handlePixel)
    
  }, [pixels])

  useEffect(() => {

    if (socket == null) return

    socket.once('first-load-canvas', c => {

        setPixels(c)
    })

    socket.emit('get-canvas')

  }, [socket])



  return (
    <div className='container'>
      <PaintPlace color={color} pixels={pixels} chosenPixel={chosenPixel} setChosenPixel={setChosenPixel} lastPixel={lastPixel} placePixel={placePixel}/>
      <ControlBar color={color} setColor={setColor} placePixel={placePixel} chosenPixel={chosenPixel}/>
    </div>
  )
}

export default App
