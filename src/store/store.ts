import { createStore } from 'vuex'
import type { UserData } from '@clerk/types';

export default createStore({
    state: {
        userData: "USER!",
        user: {} as UserData,
        auth: ""
    },
    mutations: {
        loadUser(state, data: UserData) {
            state.user = data;
        },
        set_auth(state, header: string) {
            state.auth = header
        }

    },
    actions: {

    },
    getters: {
        get_token(state) {
            return state.auth;
        }

    }
})