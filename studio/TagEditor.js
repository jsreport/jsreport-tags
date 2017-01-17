import React, { Component, PropTypes } from 'react'

// later, we can move this component in another file,
// to reuse it in entity three
const ShowColor = (props) => {
  const {
    color,
    borderColor = '#000',
    height = 15,
    width = 20
  } = props

  return (
    <span style={{
      backgroundColor: color,
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: borderColor,
      content: ' ',
      display: 'inline-block',
      height: height,
      verticalAlign: 'middle',
      width: width
    }} />
  )
}

ShowColor.propTypes = {
  color: PropTypes.string.isRequired,
  borderColor: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number
}

export default class TagEditor extends Component {
  static propTypes = {
    entity: PropTypes.object.isRequired
  }

  render () {
    const { entity } = this.props

    return (
      <div className='custom-editor'>
        <div>
          <h1><i className='fa fa-tag' /> {entity.name}</h1>
        </div>
        <div>
          <div>
            Color: &nbsp;
            <ShowColor color={entity.color} />
          </div>
        </div>
      </div>
    )
  }
}
