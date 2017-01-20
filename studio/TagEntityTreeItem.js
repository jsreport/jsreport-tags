import React, { Component } from 'react'
import ShowColor from './ShowColor'

const findTagInSet = (tagSet, tagShortId) => {
  let tag

  const found = tagSet.some((tagInSet) => {
    tag = tagInSet
    return tagInSet.shortid === tagShortId
  })

  if (found) {
    return tag
  }

  return undefined
}

class TagEntityTreeItem extends Component {
  render () {
    const { entity, entities } = this.props
    const tags = entity.tags || []
    const tagsLength = tags.length

    return (
      <div style={{ display: 'inline-block', marginLeft: '0.2rem', marginRight: '0.2rem' }}>
        {tags.map((tag, tagIndex) => {
          const tagFound = findTagInSet(entities.tags, tag.shortid) || {}

          return (
            <span key={tag.shortid} title={tagFound.name}>
              <ShowColor color={tagFound.color} width={8} height={15} />
              {(tagIndex !== tagsLength - 1) ? ' ' : null}
            </span>
          )
        })}
      </div>
    )
  }
}

export default TagEntityTreeItem
