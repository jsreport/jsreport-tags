import assign from 'object-assign'
import React, { PropTypes } from 'react'
import ShowColor from './ShowColor'
import ColorPicker from './ColorPicker'
import Popover from './Popover'

const ColorPicketTrigger = (props) => {
  const {
    displayColorPicker,
    color,
    containerStyles,
    onClickColorTrigger,
    onChangeColor,
    onCloseColorPicker,
    translateXColorPickerFromTrigger,
    translateYColorPickerFromTrigger
  } = props

  const buttonStyles = {
    boxShadow: 'none !important',
    padding: '3px',
    borderWidth: 0,
    backgroundColor: 'inherit',
    cursor: 'pointer'
  }

  const defaultContainerStyles = {
    display: 'inline-block'
  }

  const currentColor = color || ''
  const currentContainerStyles = assign({}, defaultContainerStyles, containerStyles)

  let colorPickerContainerStyles = {}

  if (translateXColorPickerFromTrigger || translateYColorPickerFromTrigger) {
    let transformValue = ''

    if (translateXColorPickerFromTrigger) {
      transformValue += `translateX(${translateXColorPickerFromTrigger}) `
    }

    if (translateYColorPickerFromTrigger) {
      transformValue += `translateY(${translateYColorPickerFromTrigger}) `
    }

    colorPickerContainerStyles.transform = transformValue
  }

  return (
    <div style={currentContainerStyles}>
      <button style={buttonStyles} onClick={onClickColorTrigger}>
        <span style={{ display: 'inline-block', height: '20px' }}>
          {!currentColor ? '(no color selected)' : <span><ShowColor color={currentColor} />&nbsp;{currentColor}</span>}
        </span>
        <br />
        <i>Click to select a color</i>
      </button>
      <Popover
        open={displayColorPicker}
        onClose={onCloseColorPicker}
      >
        <div style={colorPickerContainerStyles}>
          <ColorPicker
            disableAlpha
            color={currentColor}
            onChangeComplete={(color) => typeof onChangeColor === 'function' && onChangeColor(color.hex)}
          />
        </div>
      </Popover>
    </div>
  )
}

ColorPicketTrigger.propTypes = {
  displayColorPicker: PropTypes.bool.isRequired,
  color: PropTypes.string,
  containerStyles: PropTypes.object,
  onClickColorTrigger: PropTypes.func,
  onCloseColorPicker: PropTypes.func.isRequired,
  onChangeColor: PropTypes.fun,
  // i know.. it is a shame to decide the position of the color picker
  // in this way, maybe in the future it can be calculated based
  // on the position of the button trigger
  // using a "position" prop to specify the direction
  translateXColorPickerFromTrigger: PropTypes.string,
  translateYColorPickerFromTrigger: PropTypes.string
}

export default ColorPicketTrigger
