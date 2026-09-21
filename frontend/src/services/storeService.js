import api from "./api"

export const getStores = () => api.get("/api/stores")
export const createStore = (store) => api.post("/api/stores", store)
