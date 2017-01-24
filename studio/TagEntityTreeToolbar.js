import React, { Component } from 'react'
import emitter from './emitter'
import TagEntityTreeOrganizeButtonToolbar from './TagEntityTreeOrganizeButtonToolbar'
import TagEntityTreeFilterButtonToolbar from './TagEntityTreeFilterButtonToolbar'

class TagEntityTreeToolbar extends Component {
  constructor (props) {
    super(props)

    this.state = { organizeByTags: false }

    this.onOrganizationModeChange = this.onOrganizationModeChange.bind(this)
  }

  onOrganizationModeChange () {
    this.setState((prevState) => {
      return {
        organizeByTags: !prevState.organizeByTags
      }
    }, () => {
      // notify parent that the organization mode has changed
      emitter.emit('organizationModeByTagsChanged', this.state.organizeByTags)
    })
  }

  render () {
    const { organizeByTags } = this.state

    return (
      <div style={{ display: 'inline-block' }}>
        <TagEntityTreeFilterButtonToolbar />
        <TagEntityTreeOrganizeButtonToolbar
          active={organizeByTags}
          onClick={this.onOrganizationModeChange}
        />
      </div>
    )
  }
}

export default TagEntityTreeToolbar
