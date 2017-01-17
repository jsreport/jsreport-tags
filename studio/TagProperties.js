import React, { Component } from 'react'

export default class TagProperties extends Component {
  static title (entity, entities) {
    return `tag (color: ${entity.color})`
  }

  render () {
    const { entity, onChange } = this.props

    return (
      <div className='properties-section'>
        <div className='form-group'>
          <label>Color</label>
          <input
            type='text' value={entity.color || ''}
            onChange={(v) => onChange({ _id: entity._id, color: v.target.value })} />
        </div>
      </div>
    )
  }
}
