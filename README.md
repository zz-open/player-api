# player-api
> 音乐api服务, koa2 版本, 通过抓取各平台网页接口实现

> 当前代码仅共学习，不可做商业用途

# 环境要求
> 因为本项目采用的是`koa2`, 所以请确保你的`node`版本是18.0.0+, 越新越好

```
node -v
```

# 📦 安装
```
git clone git@github.com:zz-open/player-api.git
cd player-api
pnpm install
```

# 🔨项目启动
```
// npm i -g nodemon
pnpm start

// or don't install nodemon
pnpm dev
```
项目监听端口是`3678`

# 🐳 Docker

```sh
docker run -d --name player-api -p 3678:3678 player-api
```

# .env
启动服务之前，按需填入参数

# 文档
[在线API文档](https://apifox.com/apidoc/shared-b139df0d-fb34-4512-84af-0fc4ddbb5a57) 由 Apifox赞助