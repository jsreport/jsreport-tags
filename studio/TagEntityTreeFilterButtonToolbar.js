import React, { Component } from 'react'
import { EntityTreeButton } from 'jsreport-studio'

class TagEntityTreeFilterButtonToolbar extends Component {
  render () {
    const { active } = this.props

    return (
      <div title='Filter entities tree by tag' style={{ display: 'inline-block', marginLeft: '0.2rem', marginRight: '0.2rem' }}>
        <EntityTreeButton active={active}>
          <span style={{ display: 'inline-block' }}>
            <i className='fa fa-filter' />
            &nbsp;
            <i className='fa fa-tag' />
          </span>
        </EntityTreeButton>
      </div>
    )
  }
}

export default TagEntityTreeFilterButtonToolbar
