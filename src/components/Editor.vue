<template>
  <div>
    <div id="editor" style="text-align:left"> 
    <button @click='getContent'>查看内容</button>
    </div>
  </div>
</template>

<script>
import E from 'wangeditor'

export default {
  name: 'editor',
  data () {
    return {

    }
  },
  methods: {
    getContent() {
      let editor = this.editor
      alert(editor.txt.html())
    }
  },
  mouted() {
    let editor = new E('#editorElem')
    editor.create()
    this.editor = editor
  }
}
</script>

<style>

</style>
