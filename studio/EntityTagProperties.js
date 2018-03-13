import React, { Component } from 'react'
import ShowColor from './ShowColor'

import Studio from 'jsreport-studio'

const MultiSelect = Studio.MultiSelect

const selectValues = (selectData, atags) => {
  const { value: selectedValue, options } = selectData

  let tags = Object.assign([], atags)

  for (var i = 0; i < options.length; i++) {
    const optionIsSelected = selectedValue.indexOf(options[i].value) !== -1

    if (optionIsSelected) {
      if (!tags.filter((t) => t.shortid === options[i].value).length) {
        tags.push({ shortid: options[i].value })
      }
    } else {
      if (tags.filter((t) => t.shortid === options[i].value).length) {
        tags = tags.filter((t) => t.shortid !== options[i].value)
      }
    }
  }

  return tags
}

export default class EntityTagProperties extends Component {
  static getSelectedTags (entity, entities) {
    const getNameAndColor = (t) => {
      const foundTags = Object.keys(entities).map((k) => entities[k]).filter((tg) => tg.shortid === t.shortid)

      return foundTags.length ? { name: foundTags[0].name, color: foundTags[0].color } : { name: '', color: undefined }
    }

    return (entity.tags || []).map((t) => ({
      ...t,
      ...getNameAndColor(t)
    }))
  }

  static title (entity, entities) {
    if (!entity.tags || !entity.tags.length) {
      return 'tags'
    }

    return (
      <span>
        tags:&nbsp;
        <span>
          {
            EntityTagProperties.getSelectedTags(entity, entities).map((t, tIndex, allSelectTags) => {
              return (
                <span key={t.name} style={{ display: 'inline-block', marginRight: '2px' }}>
                  <ShowColor color={t.color} width={12} height={15} />
                  &nbsp;
                  {t.name}
                  {tIndex === allSelectTags.length - 1 ? '' : ','}
                </span>
              )
            })
          }
        </span>
      </span>
    )
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
          <MultiSelect
            title='Use the checkboxes to select/deselect multiple options.'
            size={7}
            value={entity.tags ? entity.tags.map((t) => t.shortid) : []}
            onChange={(selectData) => onChange({_id: entity._id, tags: selectValues(selectData, entity.tags)})}
            options={tags.map((t) => ({ key: t.shortid, name: t.name, value: t.shortid }))}
          />
        </div>
      </div>
    )
  }
}
