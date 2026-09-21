import api from "./api"

export const getDistributionCenters = () => api.get("/api/distribution-centers")
export const createDistributionCenter = (distributionCenter) =>
  api.post("/api/distribution-centers", distributionCenter)
