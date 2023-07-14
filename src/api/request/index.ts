// 封装类
import axios from "axios";
import { AxiosInstance, AxiosRequestConfig } from "axios";
const DEFAULT_LOADING = true;
// 自建一个用于匹配interceptors的类型
interface ZWRequestInterceptors {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig; // 这是个函数类型
  requestErrorInterceptor?: (error: any) => any;
  // responseInterceptor?: (config: AxiosResponse) => AxiosResponse;
  responseInterceptor?: (config: any) => any;
  responseErrorInterceptor?: (error: any) => any;
}
/** 再新建一个一个类型继承AxiosRequestConfig类型，并在其中设立一个属性，
该属性对应上一步建立的类型，如此，我们就可以用这个类型来代替封装类
的constructor()函数传入的参数类型了，在此基础上，完成对拦截器参数的传入。*/
interface ZWRequestConfig extends AxiosRequestConfig {
  showLoading?: boolean;
  interceptors?: ZWRequestInterceptors;
}
class ZWRequest {
  instance: AxiosInstance;
  interceptors?: ZWRequestInterceptors;
  showLoading?: Boolean;
  constructor(config: ZWRequestConfig) {
    this.instance = axios.create(config);
    this.interceptors = config.interceptors;
    this.instance.interceptors.request.use(
      (config) => {
        console.log("共有的请求时成功拦截");
        return config;
      },
      (error) => {
        console.log("共有的请求时失败拦截");
        return error;
      },
    );
    this.instance.interceptors.response.use(
      (res) => {
        console.log("共有的返回时成功的拦截", res);
        return res;
      },
      (error) => {
        console.log("共有的返回时失败的拦截");
        return error;
      },
    );
  }
  request<T>(config: ZWRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      // 对单独请求传来的拦截器进行处理
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors?.requestInterceptor(config);
      }
      if (config.showLoading === false) {
        // 代表该请求不想显示加载动画
        this.showLoading = config.showLoading;
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 每次请求返回后将showLoading的值改为默认值，以免被这次请求穿的配置影响下一次请求的加载动画显示
          this.showLoading = DEFAULT_LOADING;
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors?.responseInterceptor(res);
          }
          resolve(res);
          console.log("封装的request-res", res);
        })
        .catch((error) => {
          console.log("封装的request-error", error);
          this.showLoading = DEFAULT_LOADING;
          reject(error);
        });
    });
  }
  get<T>(url: string, params: any): Promise<T> {
    return this.request<T>({ url: url, method: "GET", params: params });
  }
  post<T>(url: string, params: any): Promise<T> {
    return this.request<T>({ url: url, method: "POST", data: params });
  }
  // delete<T>(config: ZWRequestConfig): Promise<T> {
  //   return this.request<T>({ ...config, method: "DELETE" });
  // }
}
export default ZWRequest;
