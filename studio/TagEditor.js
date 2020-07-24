import PropTypes from 'prop-types'
import React, { Component } from 'react'
import ShowColor from './ShowColor'

export default class TagEditor extends Component {
  render () {
    const { entity } = this.props

    let description

    if (entity.description) {
      description = entity.description
    } else {
      description = <i>{'(no description for this tag)'}</i>
    }

    return (
      <div className='custom-editor'>
        <div>
          <h1><i className='fa fa-tag' /> {entity.name}</h1>
        </div>
        <div>
          Description: <br />
          <p>{description}</p>
        </div>
        <div>
          Color: <ShowColor color={entity.color} />
        </div>
      </div>
    )
  }
}

TagEditor.propTypes = {
  entity: PropTypes.object.isRequired
}
