import ajax from "./ajax.js";

const headers = { headers: { firstLogin: true } }

export const Login = (data) => ajax.post("/admin/api/login", data, headers)
export const Edit = (data) => ajax.post("/admin/api/rest/articles", data, headers)
export const getTxtInfo = (id) => ajax.get(`/admin/api/rest/articles/${id}`, headers)
export const getAllTxt = () => ajax.get("/web/api/articles/list")
export const delTxt = (id) => ajax.delete(`/admin/api/rest/articles/${id}`, headers)
export const updateTxt = (id, data) => ajax.put(`/admin/api/rest/articles/${id}`, data, headers)

// 用户相关
export const getUserInfo = (id) => ajax.get(`/web/api/users/${id}`)
export const upDateUserInfo = (id,data) => ajax.put(`/web/api/users/${id}`,data)

