import Editor from './src/editor.vue'

Editor.install = (Vue) => {
  Vue.component(Editor.name, Editor)
}

export default Editor
