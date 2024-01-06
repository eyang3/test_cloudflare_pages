<template>
    <div style="height: 400px">
        <ui-editor v-model="content" style="height:10em; min-height:100%; overflow-y:auto; margin-top:3em;"></ui-editor>
        <ui-button type="raised" @click="post_action">Post</ui-button>
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
    },
    methods: {
        post_action: async function () {
            let self = this;
            console.log(this.content);
            let token = self.$store.get_token();
            let response = await fetch(`${self.root_api}/?action=post`, {
                method: 'POST',
                body: JSON.stringify({ "content": this.content }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    'Authorization': `Bearer ${token}`,
                }

            });
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
