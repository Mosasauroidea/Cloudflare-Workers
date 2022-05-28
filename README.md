## API

### search

```js
// GET /search?imdb-id=tt0096895
// GET /search?douban-id=1297970
{
  data: {
    imdb: {
      id: "tt0096895",
    },
    douban: {
      id: "1297970",
      rating: "7.6",
      votes: "233247",
      name: "蝙蝠侠 Batman",
      image: "https://img9.doubanio.com/view/photo/s_ratio_poster/public/p1502638000.jpg",
      description: "在罪恶横行的高汉市，.."
    },
  }
}
```

### actors

```js
// GET /actors?imdb-id=tt0096895
{
  data: {
    imdb: {
      id: "tt0096895",
    },
    douban: {
      id: "1297970",
    },
    actors: [
      {
        "name": "蒂姆·波顿",
        "nameEn": "Tim Burton",
        "role": "导演"
      }
    ]
  }
}
```

## Errors

```
- 失败返回: { "error": "<message>" }
- 成功返回: { "data": .. }

找不到IMDB ID: <imdbId>
检测到有异常请求
你想访问的页面不存在
html: Worker exceeded resource limits
```

## Deploy

```
cp wrangler.toml.template wrangler.toml
edit wrangler.toml
yarn deploy
```