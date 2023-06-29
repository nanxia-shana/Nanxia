/** 我们可以在出口函数中同意规定拦截器的形式以及相应的处理，这样做的好处是如果我们想
再生成一个可用的axios对象，如ZWRequest2，而且想实现与ZWRequest不一样的拦截方法，那么
就只需要在该页面再新创建一个对象即可 */
import ZWRequest from "./request";
import { BASE_URL, timeout } from "./request/config";

const zwRequest = new ZWRequest({
  baseURL: BASE_URL,
  timeout: timeout,
  showLoading: true,
  headers: {
    token: "store.state.token",
  },
});
export default zwRequest;
