<template>
    <div style="height: 400px">
        <ui-textfield id="titlefield" v-model="title" required style="width:80%">
            Post Title
        </ui-textfield>
        <ui-editor v-model="content" style="height:10em; min-height:100%; overflow-y:auto; margin-top:3em;"></ui-editor>
        <ui-button type="raised" @click="post_action">Post</ui-button>
    </div>
</template>
  
<script lang="ts">

import { defineComponent } from 'vue';
import $ from 'jquery';

export default defineComponent({
    // type inference enabled
    data() {
        return {
            content: '',
            firstLoad: true,
            title: '',
        }
    },
    mounted() {
        $('.mdc-text-field__ripple').remove();

    },
    methods: {
        post_action: async function () {
            let self = this;
            let token = this.$store.getters.get_token;
            let response = await fetch(`${self.root_api}/?action=post`, {
                method: 'POST',
                body: JSON.stringify({ "content": this.content, "title": this.title }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    'Authorization': `Bearer ${token}`,
                }

            });
            console.log(response);
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

>>>.ql-toolbar.ql-snow {
    border: 1px solid rgba(0, 0, 0, .4);
    box-sizing: border-box;
    font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
    padding: 8px;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;

}

>>>.mdc-text-field {
    background-color: white;
    border-radius: 3px;
    border: 1px solid rgba(0, 0, 0, .4);

}

>>>.mdc-text-field--focused.mdc-text-field:not(.mdc-text-field--disabled) .mdc-floating-label {
    background-color: white;
}

>>>.mdc-text-field.active {
    background-color: white;
    border-radius: 3px;
    border: 1px solid rgba(0, 0, 0, .4);

}

>>>.ql-container.ql-snow {
    border: 1px solid rgba(0, 0, 0, .4);
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
}




#mdc-editor {
    height: 100%;
    border-radius: 3px;
}
</style>
