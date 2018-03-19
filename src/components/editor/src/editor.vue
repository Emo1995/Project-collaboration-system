<template>
<div class="v-editor">
  <textarea class="hidden" :id="txtId"></textarea>
</div>
</template>

<script>
const tinymceLoader = () => new Promise((resolve) => {
  require.ensure([
    '../tinymce/tinymce.full',
    '../tinymce/langs/zh_CN.js',
    '../tinymce/skins/lightgray/skin.min.css',
    '../tinymce/skins/lightgray/content.inline.min.css'
  ], (require) => {
    const tinymce = require('../tinymce/tinymce.full')
    require('../tinymce/langs/zh_CN.js')
    require('../tinymce/skins/lightgray/skin.min.css')
    require('../tinymce/skins/lightgray/content.inline.min.css')

    resolve(tinymce)
  }, 'tinymce')
})

let id = 0

export default {
  name: 'vEditor',

  props: {
    value: {}
  },

  data () {
    return {
      txtId: `v-editor-txt-${id++}`
    }
  },

  mounted () {
    tinymceLoader().then((tinymce) => {
      this.initEditor(tinymce)
    })
  },

  computed: {
    content: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    }
  },

  watch: {
    value (val) {
      if (this.editor && val !== this.editor.getContent()) {
        this.editor.setContent(val)
      }
    }
  },

  beforeDestroy () {
    if (this.editor) {
      this.editor.remove()
    }
  },

  methods: {
    initEditor (tinymce) {
      tinymce.init({
        selector: `#${this.txtId}`,
        height: 350,
        skin: false,
        image_upload: true,
        content_style: `
* { margin: 0; padding: 0; }
body { background: #fff; color: #262626; font-family: 'PingFangSC-Regular', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Microsoft YaHei', 'sans-serif'; -moz-font-smoothing: antialiased; -webkit-font-smoothing: antialiased; margin: 0 auto 24px; padding-bottom: 6px; text-align: left; width: 700px; }
a { color: #3f5a93; border-bottom: 1px dashed #3f5a93; outline: 0; text-decoration: none; }
a:hover { border-bottom: 1px solid #2972cc; color: #2972cc; }
h2, h3, h4, h5 { font-size: 16px; }
p, ul, ol { margin: 1.2em 0; line-height: 1.8em; }
ul li, ol li { list-style-position: inside; }
ul li { list-style-type: circle; }
ol li { list-style-type: decimal; }
span { line-height: 1.8em; }
img { margin: 0.4em 0; max-width: 100%; }
table { width: 100%; margin: 1.8em 0; border: 1px solid #eee; border-collapse: collapse; }
table th, table td { padding: 0.4em 0.6em; border: 1px solid #eee; font-size: 14px; }
table th { background-color: #f7f7f7; }
        `,
        plugin_preview_width: window.innerWidth - 200,
        plugin_preview_height: window.innerHeight - 200,
        plugins: ['advlist', 'anchor', 'autolink', 'charmap', 'code', 'colorpicker', 'contextmenu', 'directionality', 'emoticons', 'fullscreen', 'hr', 'image', 'insertdatetime', 'link', 'lists', 'media', 'nonbreaking', 'paste', 'preview', 'print', 'save', 'searchreplace', 'table', 'textcolor', 'textpattern', 'visualblocks', 'visualchars', 'wordcount'],
        toolbar: 'fontsizeselect | undo redo | bold italic | forecolor | alignleft aligncenter alignright alignjustify | bullist numlist | link image media | fullscreen preview',
        setup: (editor) => {
          this.editor = editor

          editor.on('init', e => e.target.setContent(this.content))

          editor.on('change undo redo', (e) => {
            this.content = e.target.getContent().trim()
          })
        },
        image_uploader: (file, callback) => {
          if (!file) {
            return
          }

          // 对话框的 z-index 太大了， loading 和 tip 效果被遮盖，这里处理一下
          tinymce.$.find('.mce-window[role="dialog"]')[0].style.zIndex = 199 // 不能超过 v-backdrop 的 z-index
          tinymce.$.find('#mce-modal-block')[0].style.zIndex = 198

          this.$emit('upload-image', file, callback) // callback(/* 上传成功之后的图片 url */)
        }
      })
    }
  }
}
  /* eslint-disable max-len */
  /*
webpack配置如下所示：

  module: {
      preLoaders: [
          {
              test: /\.js$/,
              loader: 'eslint-loader',
              exclude: /tinymce/,
          },
      ],
      loaders: [
          {
              test: /\.js$/,
              loader: 'babel-loader',
              exclude: /tinymce/,
          },
          {
              test: /\.css$/,
              loader: 'style-loader!css-loader',
              include: /tinymce/,
          },
      ],
  },
自定义 tinymce 步骤

1. 在 "tinymce/js/tinymce/plugins/image/plugin.js" 文件的 378 行增加如下代码
  if (typeof editor.settings.image_uploader === 'function') {
      generalFormItems.unshift({
          name: 'upload',
          type: 'button',
          label: '本地上传',
          text: '选择文件',
          onclick: function (e) {
              var fileDom = document.createElement('input')
              fileDom.type = 'file';
              fileDom.click();
              fileDom.addEventListener('change', function (event) {
                  editor.settings.image_uploader(fileDom.files[0], function (url) {
                      win.find("#src").value(url);
                  });
              }, false);
          }
      });
  }
2. 在 "tinymce/js/tinymce/plugins/preview/plugin.js" 文件的 36 行增加如下代码
  var contentStyle = editor.getParam('content_style');

  if (contentStyle) {
      headHtml += '<style type="text/css">' + contentStyle + '</style>';
  }

3. 执行如下自定义命令
  grunt bundle --themes=modern --plugins=advlist,anchor,autolink,charmap,code,colorpicker,contextmenu,directionality,emoticons,fullscreen,hr,image,insertdatetime,link,lists,media,nonbreaking,paste,preview,print,save,searchreplace,table,textcolor,textpattern,visualblocks,visualchars,wordcount

4. 增加 /* eslint-disable */
</script>

<style lang="scss">
  .v-editor {
    max-width: 900px;

    & > textarea {
      height: 350px + 109px;
      width: 100%;
    }
  }
</style>
