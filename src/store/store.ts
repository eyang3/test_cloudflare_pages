import { createStore } from 'vuex'
import type { UserData } from '@clerk/types';

export default createStore({
    state: {
        userData: "USER!",
        user: {} as UserData
    },
    mutations: {
        loadUser(state, data: UserData) {
            state.user = data;
        }
    },
    actions: {

    },
    getters: {

    }
})