import React from 'react'
import { BlockPicker } from 'react-color'


export default function ColorPicker (props) {

    return (
    <div className='colorpicker'>
        <BlockPicker
        color={props.color}
        colors={[
            '#32a852',
            '#eb4034',
            '#fcba03',
            '#4287f5',
            '#FFFFFF',
            '#000000'
    ]}
        triangle='hide'
        onChangeComplete={c => {
            props.setColor(c.rgb)
        }}
        />
    </div>
    )
}
