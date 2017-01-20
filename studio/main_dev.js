import Studio from 'jsreport-studio'
import NewTagModal from './NewTagModal'
import TagEditor from './TagEditor'
import TagProperties from './TagProperties'
import EntityTagProperties from './EntityTagProperties'
import TagEntityTreeToolbar from './TagEntityTreeToolbar'

Studio.addEntitySet({
  name: 'tags',
  faIcon: 'fa-tag',
  visibleName: 'tag',
  onNew: () => Studio.openModal(NewTagModal),
  helpUrl: 'http://jsreport.net/learn/tags',
  referenceAttributes: ['color']
})

Studio.addEditorComponent('tags', TagEditor)
Studio.addPropertiesComponent(TagProperties.title, TagProperties, (entity) => entity.__entitySet === 'tags')
Studio.addPropertiesComponent(EntityTagProperties.title, EntityTagProperties, (entity) => entity.__entitySet === 'templates')

Studio.addEntityTreeToolbarComponent(TagEntityTreeToolbar)
