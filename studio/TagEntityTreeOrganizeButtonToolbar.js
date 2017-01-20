import React, { Component } from 'react'

class TagEntityTreeOrganizeButtonToolbar extends Component {
  render () {
    return (
      <div title='Organize entities tree by tag' style={{ display: 'inline-block', marginLeft: '0.2rem', marginRight: '0.2rem' }}>
        <button>
          <i className='fa fa-tags' />
        </button>
      </div>
    )
  }
}

export default TagEntityTreeOrganizeButtonToolbar
