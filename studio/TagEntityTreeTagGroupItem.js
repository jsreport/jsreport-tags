import React, { Component } from 'react'
import ShowColor from './ShowColor'

class TagEntityTreeTagGroupItem extends Component {
  render () {
    const { name, __entitySet, color } = this.props

    if (__entitySet !== 'tags') {
      return null
    }

    return (
      <span title={name} style={{ display: 'inline-block', marginLeft: '0.2rem', marginRight: '0.2rem' }}>
        <ShowColor color={color} width={8} height={15} />
        &nbsp;
      </span>
    )
  }
}

export default TagEntityTreeTagGroupItem
