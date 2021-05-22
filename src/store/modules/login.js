import { LOGIN } from "../types"
import { Login } from "@/api";
export default {
    state: {
        data: {},
        isLogin: false,
        currentUserData: {},
        token: ''
    },
    mutations: {
        [LOGIN](state, token) {
            state.token = token
        },

    },
    actions: {
        async Login({ commit }, LoginInfo) {
            let result = await Login(LoginInfo)
            console.log(result);
            if (result.code == 0) {
                let token = result.token;
                commit(LOGIN, token);
            }
        },

    }
}