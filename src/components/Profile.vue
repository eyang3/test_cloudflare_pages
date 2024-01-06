<template>
    <main style="margin: 30px">
        <img :src="imgURL" width="100" />
        <div>
            <RouterLink to="/" class="mdc-button" v-ripple>Feed</RouterLink>
            <br>
            <RouterLink to="/post" class="mdc-button" v-ripple>Post</RouterLink>
            <br>
            <RouterLink to="/about" class="mdc-button" v-ripple>Settings</RouterLink>
            <hr>
            <div id="auth-links" v-if="!hasUser">
                <a href="javascript:void(0)" class="mdc-button" v-on:click="signUp">Sign Up</a>
                <br>
                <a href="javascript:void(0)" class="mdc-button" onclick="Clerk.openSignIn()">Sign In</a>
            </div>
            <div id="sign-out" v-if="hasUser">
                <a class="mdc-button" v-on:click="logout()">Sign Out</a>

            </div>
        </div>
    </main>
</template>
  
<script lang="ts">
import { CREATE_BLOCK } from '@vue/compiler-core';
import { defineComponent } from 'vue'
// var Clerk: any;

export default defineComponent({
    // type inference enabled
    props: {
        name: String,
        msg: { type: String, required: true }
    },
    methods: {
        logout: async function () {
            await Clerk.signOut();
            window.location.reload();
        },
        signUp: function () {
            var host = window.location.protocol + "//" + window.location.host;
            Clerk.openSignUp({
                afterSignInUrl: "http://127.0.0.1:5173/?boo=1",
                oauth_callback: "http://127.0.0.1:5173/?boo=1",
                "oauth-native-callback": "http://127.0.0.1:5173/?boo=1"
            });
        }
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
        script.setAttribute('oauth-native-callback', "http://127.0.0.1:5173/?boo=1");
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
                console.log(Clerk.user);
                self.$store.commit('loadUser', Clerk.user);
                // if the time between creation and now is less than 2 seconds consider it a new user
                // if (Clerk.user.createdAt - Date.now() < 2000) {
                let payload = {
                    userid: Clerk.user.id,
                    userimg: Clerk.user.imageUrl,
                    username: Clerk.user.fullName
                };
                console.log(self.root_api)
                let response = await fetch(`${self.root_api}/?action=login`, {
                    method: 'POST',
                    body: JSON.stringify(payload),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    }
                })
                self.$store.commit('set_auth', response.headers.get("Authorization"))
            } else {
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

hr {
    margin-right: 20px;

}
</style>
  