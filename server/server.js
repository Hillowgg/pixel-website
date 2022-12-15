console.log('starting')

const io = require('socket.io')(8080, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
})

function newCanvas() {
    let canvas = [... new Array(500 * 500 * 4)].map((curr, ind)=> {
        if ((ind + 1) % 4 === 0) return 255
        return Math.floor(0xffffff)})
        // return (ind + 1) % (4 * 500) + 100})
    return canvas
}

c = newCanvas()

function placePixel(x, y, color) {
    let offset = (y * 500 + x) * 4
    c[offset] = color.r
    c[offset + 1] = color.g
    c[offset + 2] = color.b
}


io.on('connection', (socket) => {
    console.log('connected')
    socket.on('get-canvas', () => {
        socket.emit('first-load-canvas', c)
    })


    socket.on('place-pixel', ({ x, y, color }) => {
        placePixel(x, y, color)
        socket.broadcast.emit('receive-pixel', {x, y, color})
    })
})

