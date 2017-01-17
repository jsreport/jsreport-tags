import React, { Component, PropTypes } from 'react'
import Studio from 'jsreport-studio'

export default class NewTagModal extends Component {
  static propTypes = {
    close: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)

    this.state = { error: null }
  }

  // the modal component for some reason after open focuses the panel itself
  componentDidMount () {
    setTimeout(() => this.refs.name.focus(), 0)
  }

  handleKeyPress (e) {
    if (e.key === 'Enter') {
      this.createTag()
    }
  }

  async createTag () {
    let entity = {}

    if (!this.refs.name.value) {
      return this.setState({
        error: 'name field cannot be empty'
      })
    }

    if (!this.refs.color.value) {
      return this.setState({
        error: 'color field cannot be empty'
      })
    }

    entity.name = this.refs.name.value
    entity.color = this.refs.color.value

    try {
      let response = await Studio.api.post('/odata/tags', {
        data: entity
      })

      response.__entitySet = 'tags'

      Studio.addExistingEntity(response)
      Studio.openTab(response)
      this.props.close()
    } catch (e) {
      this.setState({
        error: e.message
      })
    }
  }

  render () {
    const { error } = this.state

    return (
      <div>
        <div className='form-group'>
          <label>Name</label>
          <input type='text' name='name' ref='name' placeholder='tag name...' onKeyPress={(e) => this.handleKeyPress(e)} />
        </div>
        <div className='form-group'>
          <label>Color</label>
          {/* Temporary input for color selection, i will change it with a color picker component */}
          <input type='text' name='color' ref='color' placeholder='#006600' onKeyPress={(e) => this.handleKeyPress(e)} />
        </div>
        <div className='form-group'>
          <span
            style={{color: 'red', display: error ? 'block' : 'none'}}>{error}</span>
        </div>
        <div className='form-group' style={{opacity: 0.8}}>
          <hr />
          <span>
            You can use tags to organize jsreport objects.<br />
            This can be for example a tag to organize and group related templates, images, data, scripts, assets, etc. <br />
            See the <a target='_blank' title='Help' href='http://jsreport.net/learn/tags'>documentation</a> for details.
          </span>
        </div>
        <div className='button-bar'>
          <button onClick={() => this.createTag()} className={'button confirmation'}>Ok</button>
        </div>
      </div>
    )
  }
}
