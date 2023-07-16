<template>
    <div style="height: 400px">
        <ui-editor v-model="content" style="height:10em; min-height:100%; overflow-y:auto; margin-top:3em;"></ui-editor>
        <ui-button type="raised">Post</ui-button>
    </div>
</template>
  
<script lang="ts">

import { defineComponent } from 'vue'

export default defineComponent({
    // type inference enabled
    data() {
        return {
            content: '',
            firstLoad: true
        }


    }
})
</script>

<style scoped>
@media (min-width: 1024px) {
    .about {
        min-height: 100vh;
        display: flex;
        align-items: center;
    }
}

>>>.mdc-editor__content {
    height: 85%;
    width: 80%;
}

#mdc-editor {
    height: 100%;
}
</style>
