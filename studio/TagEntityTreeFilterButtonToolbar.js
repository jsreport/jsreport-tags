import React, { Component } from 'react'

class TagEntityTreeFilterButtonToolbar extends Component {
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

    const { active } = this.props

    let styles

    if (active) {
      styles = { ...buttonStyles.default, ...buttonStyles.active }
    } else {
      styles = buttonStyles.default
    }

    return (
      <div title='Filter entities tree by tag' style={{ display: 'inline-block', marginLeft: '0.2rem', marginRight: '0.2rem' }}>
        <button style={styles}>
          <span style={{ display: 'inline-block' }}>
            <i className='fa fa-filter' />
            &nbsp;
            <i className='fa fa-tag' />
          </span>
        </button>
      </div>
    )
  }
}

export default TagEntityTreeFilterButtonToolbar
