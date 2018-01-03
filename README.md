

### Development
```shell
$ npm install
$ npm run dev
$ open http://localhost:7001/news
```

### Deploy

Use `EGG_SERVER_ENV=prod` to enable prod mode

```shell
$ EGG_SERVER_ENV=prod npm start
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.


[egg]: https://eggjs.org



##部署：

$ npm install --production
$ tar -zcvf ../release.tgz .

```shell
tar -xzvf release.tgz -C xxx
打包传到服务器
```
现网发布
```shell
$ EGG_SERVER_ENV=prod npm start
```
云测发布
```shell
$ EGG_SERVER_ENV=test npm start
```



日志级别
修改以下代码，云测修改config.test.js
修改以下代码，生产环境修改config.prod.js

```shell
    config.logger = {
          dir: '/data/logs/fide_access',
          level: 'INFO',
          consoleLevel: 'INFO'
      };
```