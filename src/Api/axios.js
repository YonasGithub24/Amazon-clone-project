import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "http://127.0.0.1:5001/clone-28ff3/us-central1/api",
  baseURL: "https://api-vmc66y43oa-uc.a.run.app/",
});

export { axiosInstance };

