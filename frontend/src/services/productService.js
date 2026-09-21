import api from "./api"

export const getProducts = () => api.get("/api/products")
export const createProduct = (product) => api.post("/api/products", product)
