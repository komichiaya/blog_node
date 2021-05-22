import { EDIT_TXT, TXT_INFO, ALL_TXTINFO, UPDATE_TXT } from "../types"
import { Edit, getTxtInfo, getAllTxt, updateTxt } from "@/api";
export default {
    state: {
        data: {},
        txtInfo: {},
        AllTxt: [],
        msg: "",
        newTxt: []

    },
    mutations: {
        [EDIT_TXT](state, data) {
            state.data = data
        },
        [TXT_INFO](state, txtInfo) {
            state.txtInfo = txtInfo
        },
        [ALL_TXTINFO](state, AllTxt) {
            state.AllTxt = AllTxt
        },
        [UPDATE_TXT](state, newTxt) {
            state.newTxt = newTxt
        }
    },
    actions: {
        async Edit({ commit }, data) {
            let resutl = await Edit(data)
            if (resutl) {
                commit(EDIT_TXT, resutl)
            }
        },
        async txtInfo({ commit }, id) {
            let result = await getTxtInfo(id)
            if (result) {
                commit(TXT_INFO, result)
            }
        },
        async getAllTxt({ commit }) {
            let result = await getAllTxt()
            if (result) {
                commit(ALL_TXTINFO, result)
            }
        },

        async updateTxt({ commit }, { id, data }) {
            let resule = await updateTxt(id, data)
            if (resule) {
                commit(UPDATE_TXT, resule)
            }
        }
    },
    getters: {}
}