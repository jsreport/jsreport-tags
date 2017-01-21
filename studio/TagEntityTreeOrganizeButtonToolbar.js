import React, { Component } from 'react'

class TagEntityTreeOrganizeButtonToolbar extends Component {
  render () {
    const buttonStyles = {
      default: {
        backgroundColor: '#fff',
        borderRadius: '20%',
        border: '1px solid #cacaca',
        color: '#000'
      },
      active: {
        backgroundColor: '#1c97ea',
        borderColor: '#789bea',
        color: '#fff'
      }
    }

    const { onClick, active } = this.props

    let styles

    if (active) {
      styles = { ...buttonStyles.default, ...buttonStyles.active }
    } else {
      styles = buttonStyles.default
    }

    return (
      <div title='Organize entities tree by tag' style={{ display: 'inline-block', marginLeft: '0.2rem', marginRight: '0.2rem' }}>
        <button onClick={onClick} style={styles}>
          <i className='fa fa-tags' />
        </button>
      </div>
    )
  }
}

export default TagEntityTreeOrganizeButtonToolbar
