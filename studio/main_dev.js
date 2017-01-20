import Studio from 'jsreport-studio'
import NewTagModal from './NewTagModal'
import TagEditor from './TagEditor'
import TagProperties from './TagProperties'
import EntityTagProperties from './EntityTagProperties'
import TagEntityTreeToolbar from './TagEntityTreeToolbar'
import TagEntityTreeItem from './TagEntityTreeItem'

Studio.addEntitySet({
  name: 'tags',
  faIcon: 'fa-tag',
  visibleName: 'tag',
  onNew: () => Studio.openModal(NewTagModal),
  helpUrl: 'http://jsreport.net/learn/tags',
  referenceAttributes: ['color']
})

// add tags to referenceAttributes in all entities
Object.keys(Studio.entitySets).forEach((entitySetName) => {
  let entitySet = Studio.entitySets[entitySetName]

  if (!entitySet) {
    return
  }

  // ignore tags entity set
  if (entitySet.name === 'tags') {
    return
  }

  if (Array.isArray(entitySet.referenceAttributes) && entitySet.referenceAttributes.indexOf('tags') === -1) {
    entitySet.referenceAttributes.push('tags')
  }
})

Studio.addEditorComponent('tags', TagEditor)
Studio.addPropertiesComponent(TagProperties.title, TagProperties, (entity) => entity.__entitySet === 'tags')
Studio.addPropertiesComponent(EntityTagProperties.title, EntityTagProperties, (entity) => entity.__entitySet === 'templates')

Studio.addEntityTreeToolbarComponent(TagEntityTreeToolbar)
Studio.addEntityTreeItemComponent(TagEntityTreeItem)
