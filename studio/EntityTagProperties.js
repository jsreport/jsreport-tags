import React, { Component } from 'react'

const selectValues = (event, atags) => {
  const el = event.target

  let tags = Object.assign([], atags)

  for (var i = 0; i < el.options.length; i++) {
    if (el.options[i].selected) {
      if (!tags.filter((t) => t.shortid === el.options[i].value).length) {
        tags.push({ shortid: el.options[i].value })
      }
    } else {
      if (tags.filter((t) => t.shortid === el.options[i].value).length) {
        tags = tags.filter((t) => t.shortid !== el.options[i].value)
      }
    }
  }

  return tags
}

export default class EntityTagProperties extends Component {
  static getSelectedTags (entity, entities) {
    const getName = (t) => {
      const foundTags = Object.keys(entities).map((k) => entities[k]).filter((tg) => tg.shortid === t.shortid)

      return foundTags.length ? foundTags[0].name : ''
    }

    return (entity.tags || []).map((t) => ({
      ...t,
      name: getName(t)
    }))
  }

  static title (entity, entities) {
    if (!entity.tags || !entity.tags.length) {
      return 'tags'
    }

    return `tags: ${EntityTagProperties.getSelectedTags(entity, entities).map((t) => t.name).join(', ')}`
  }

  componentDidMount () {
    this.removeInvalidTagReferences()
  }

  componentDidUpdate () {
    this.removeInvalidTagReferences()
  }

  selectTags (entities) {
    return Object.keys(entities).filter((k) => entities[k].__entitySet === 'tags').map((k) => entities[k])
  }

  removeInvalidTagReferences () {
    const { entity, entities, onChange } = this.props

    if (!entity.tags) {
      return
    }

    const updatedTags = entity.tags.filter((t) => Object.keys(entities).filter((k) => entities[k].__entitySet === 'tags' && entities[k].shortid === t.shortid).length)

    if (updatedTags.length !== entity.tags.length) {
      onChange({ _id: entity._id, tags: updatedTags })
    }
  }

  render () {
    const { entity, entities, onChange } = this.props
    const tags = this.selectTags(entities)

    return (
      <div className='properties-section'>
        <div className='form-group'>
          <select
            title='Use CTRL to deselect item and also to select multiple options.'
            multiple
            size='7'
            value={entity.tags ? entity.tags.map((t) => t.shortid) : []}
            onChange={(v) => onChange({_id: entity._id, tags: selectValues(v, entity.tags)})}>
            {tags.map((t) => <option key={t.shortid} value={t.shortid}>{t.name}</option>)}
          </select>
        </div>
      </div>
    )
  }
}
