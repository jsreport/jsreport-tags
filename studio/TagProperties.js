import React, { Component } from 'react'
import ShowColor from './ShowColor'

export default class TagProperties extends Component {
  static title (entity, entities) {
    return (
      <span>
        <span>
          tag (color: {<ShowColor color={entity.color} width={15} height={15} />})
        </span>
      </span>
    )
  }

  render () {
    const { entity, onChange } = this.props

    return (
      <div className='properties-section'>
        <div className='form-group'>
          <label>Color</label>
          <input
            type='text' value={entity.color || ''}
            onChange={(v) => onChange({ _id: entity._id, color: v.target.value })}
          />
        </div>
        <div className='form-group'>
          <label>Description</label>
          <textarea
            rows='4'
            style={{ resize: 'vertical' }}
            value={entity.description || ''}
            onChange={(v) => onChange({ _id: entity._id, description: v.target.value })}
          />
        </div>
      </div>
    )
  }
}
