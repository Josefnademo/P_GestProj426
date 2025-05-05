import axios from "axios";

const apiClient = axios.create({
  baseURL: "localhost:3000/api/" /*+fin d'URL*/,
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default {
  getDetail(id) {
    return apiClient.get("/details/" + id);
  },
  wantToVisit(lieu_id, compte_id) {
    return apiClient.get("/aimeraitVisiter/" + lieu_id + "/user/" + compte_id);
  },
};
