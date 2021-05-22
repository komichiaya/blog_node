import { UPDATE_USERINFO, GET_USERINFO } from "../types"
import { getUserInfo, upDateUserInfo } from "@/api"
export default {
    state: {
        userInfo: {},
        newuserInfo: {}
    },
    mutations: {
        [UPDATE_USERINFO](state, data) {
            state.newuserInfo = data
        },
        [GET_USERINFO](state, data) {
            state.userInfo = data
        },
    },
    actions: {
        async getUserInfo({ commit }, id) {
            let result = await getUserInfo(id)
            if (result) {
                commit(GET_USERINFO, result)
            }
        },
        async updateUserInfo({ commit }, { id, data }) {
            let result = await upDateUserInfo(id, data)
            if (result) {
                commit(UPDATE_USERINFO, result)
            }
        }
    },
    getters: {}
}