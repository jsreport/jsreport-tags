import React, { Component } from 'react'

class TagEntityTreeFilterButtonToolbar extends Component {
  render () {
    return (
      <div title='Filter entities tree by tag' style={{ display: 'inline-block', marginLeft: '0.2rem', marginRight: '0.2rem' }}>
        <button>
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
