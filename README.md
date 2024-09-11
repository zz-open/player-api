# PlayerApi
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

### 🐳 Docker

```sh
docker run -d --name player-api -p 3678:3678 player-api
```

# tecent music
- 需要先登录拿到cookie
- 还需要QQ号码

### 功能特性
- [x] 获取用户歌单列表

# netease music