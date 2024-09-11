import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://c6.y.qq.com/',
  timeout: 7000,
  headers: {
    referer: 'https://y.qq.com/',
  },
  withCredentials: true, // `withCredentials` 表示跨域请求时是否需要使用凭证
});

export async function baseRequest(url, method = 'GET', options = {}) {
  return new Promise((resolve, reject) => {
    console.log("请求url:", url, "\n")
    console.log("请求方法:", method , "\n")
    console.log("参数:", options, "\n")
    instance[method](url, options).then(
      response => {
        if (!response) {
          throw Error('response is success but data is null');
        }
  
        resolve(response)
      },
      error => {
        console.log(`${url} request error`);
        throw error;
      },
    );
  })
}
