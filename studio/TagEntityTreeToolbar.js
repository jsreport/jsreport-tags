import React, { Component } from 'react'
import TagEntityTreeOrganizeButtonToolbar from './TagEntityTreeOrganizeButtonToolbar'
import TagEntityTreeFilterButtonToolbar from './TagEntityTreeFilterButtonToolbar'

class TagEntityTreeToolbar extends Component {
  render () {
    return (
      <div style={{ marginTop: '0.6rem' }}>
        <TagEntityTreeOrganizeButtonToolbar />
        <TagEntityTreeFilterButtonToolbar />
      </div>
    )
  }
}

export default TagEntityTreeToolbar
