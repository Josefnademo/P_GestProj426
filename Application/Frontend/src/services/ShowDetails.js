import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000/",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default {
  getDetail(id) {
    return apiClient.get("lieu/" + id);
  },
  wantToVisit(lieu_id, compte_id) {
    return apiClient.get("visit/" + lieu_id + "/user/" + compte_id);
  },
  getUserId() {
    return apiClient.get("/getuserid");
  },
};
