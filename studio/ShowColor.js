import React, { PropTypes } from 'react'

const ShowColor = (props) => {
  const {
    color,
    borderColor = '#000',
    height = 15,
    width = 20
  } = props

  return (
    <span style={{
      backgroundColor: color,
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: borderColor,
      content: ' ',
      display: 'inline-block',
      height: height,
      verticalAlign: 'middle',
      width: width
    }} />
  )
}

ShowColor.propTypes = {
  color: PropTypes.string.isRequired,
  borderColor: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number
}

export default ShowColor
