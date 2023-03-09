import axios from "axios";
import { toast } from "react-toastify";
import setAuthToken from "./utils/setAuthToken";
const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  withCredentials: true
});

// Thêm một bộ đón chặn request
instance.interceptors.request.use(function (config) {
  // Làm gì đó trước khi request dược gửi đi
  return config;
}, function (error) {
  // Làm gì đó với lỗi request
  // return Promise.reject(error);
});

// Thêm một bộ đón chặn response
instance.interceptors.response.use(function (response) {
  // Bất kì mã trạng thái nào nằm trong tầm 2xx đều khiến hàm này được trigger
  // Làm gì đó với dữ liệu response
  return response;
}, async function (error) {
  // Bất kì mã trạng thái nào lọt ra ngoài tầm 2xx đều khiến hàm này được trigger\
  // Làm gì đó với lỗi response
  const statusCode = error.response.status
  const originalRequest = error.config;
  const curAccessToken = localStorage.getItem("access_token")
  if (statusCode >= 400 && !originalRequest._retry) {
    if (curAccessToken) {
      originalRequest._retry = true;
      const res: any = await axios({
        baseURL: process.env.REACT_APP_SERVER_URL,
        withCredentials: true,
        url: '/refreshtoken',
        method: 'post'
      })
      const accessToken = res.data.accessToken
      if (accessToken) {
        localStorage.setItem('access_token', accessToken)
        setAuthToken(accessToken)
        originalRequest.headers.Authorization = `Bearer ${accessToken}`
        return await instance(originalRequest)
      }
    } else {
      toast.warn('Đăng nhập trước')
    }
  } else {
    toast.warn('Thực hiện lại')
  }
});

export default instance