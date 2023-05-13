<template>
    <main>
        <img :src="imgURL" width="100" />
        <div id="auth-links" v-if="!hasUser">
            <a href="javascript:void(0)" onclick="Clerk.openSignUp()">Sign Up</a> |
            <a href="javascript:void(0)" onclick="Clerk.openSignIn()">Sign In</a>
        </div>
    </main>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    // type inference enabled
    props: {
        name: String,
        msg: { type: String, required: true }
    },
    data() {
        return {
            count: 1,
            firstLoad: true
        }
    },
    computed: {
        imgURL() {
            return this.$store.state.user.profileImageUrl;
        },
        hasUser() {
            const firstLoadOrUser = this.firstLoad || (this.$store.state.user.profileImageUrl != null);
            return firstLoadOrUser;
        }
    },
    mounted() {
        let self = this;

        const frontend_api = "pk_test_aGVscGZ1bC1sYWJyYWRvci02NC5jbGVyay5hY2NvdW50cy5kZXYk"
        // Create a script that will be loaded asynchronously in 
        // your page. 
        const script = document.createElement('script');
        script.setAttribute('data-clerk-frontend-api', frontend_api);
        script.async = true;
        script.src = `https://cdn.jsdelivr.net/npm/@clerk/clerk-js@latest/dist/clerk.browser.js`;
        script.crossOrigin = "anonymous";
        // Add a listener so you can initialize ClerkJS
        // once it's loaded.
        script.addEventListener('load', async function () {
            await window.Clerk.load({
                // Set load options here...
            });

            if (Clerk.user) {
                // Mount user button component
                self.$store.commit('loadUser', Clerk.user);
            } else {
                console.log("Nothing Here");
                self.firstLoad = false;
            }
        });
        document.body.appendChild(script);
        this.name // type: string | undefined
        this.msg // type: string
        this.count // type: number
    }
})
</script>
<style>
@media (min-width: 1024px) {
    .about {
        min-height: 100vh;
        display: flex;
        align-items: center;
    }
}
</style>
  