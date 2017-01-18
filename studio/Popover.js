import React, { PropTypes } from 'react'

const Popover = (props) => {
  const {
    open,
    onClose,
    children
  } = props

  const popoverStyles = {
    display: open ? 'block' : 'none',
    position: 'fixed',
    zIndex: '2'
  }

  const popoverContainer = {
    position: 'absolute',
    zIndex: '2'
  }

  const coverStyles = {
    position: 'fixed',
    top: '0px',
    right: '0px',
    bottom: '0px',
    left: '0px'
  }

  return (
    <div style={popoverStyles}>
      <div style={popoverContainer}>
        <div style={coverStyles} onClick={onClose} />
        {open ? children : null}
      </div>
    </div>
  )
}

Popover.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
}

export default Popover
