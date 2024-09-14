import axios from 'axios'

const instance = axios.create({
  timeout: 7000,
  withCredentials: true, // `withCredentials` 表示跨域请求时是否需要使用凭证
})

export async function baseRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    if (!options.method) {
      options.method = 'GET'
    }

    console.log('请求url:', url, '\n')
    console.log('参数:', options, '\n')
    instance.request(url, options).then(
      (response) => {
        if (!response) {
          throw new Error('response is success but data is null')
        }

        resolve(response)
      },
      (error) => {
        console.log(`${url} request error`)
        throw error
      },
    )
  })
}
