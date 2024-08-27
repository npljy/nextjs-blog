---
title: 关于MongoDB数据库被勒索
date: 2023-12-19
key: 1,
categories: 问题记录
tags: MongoDB
description: 记录遇到mongodb被勒索的问题以及解决方法
---

# 背景

事情是这样的，在服务器上部署了`docker`，使用`docker`启动的`moogodb`，然后经常发现数据不见了。然后也没找到原因，在网上查了。最后发现在数据库下面多了一个`collection`，叫`READ__ME_TO_RECOVER_DATA`。![pic](https://blog-offical-1302483222.cos.ap-guangzhou.myqcloud.com/mx_screencap_20240716_141146.png)

打开后里面有一条数据，内容是这样的。

**All your data is backed up. You must pay 0.0061 BTC to bc1qxnymm0xynyetpqgzt3k7jlayc4p2kraz9nvppm In 48 hours, your data will be publicly disclosed and deleted. (more information: go to https://is.gd/rudata1)After paying send mail to us: dzen+18zvpb@onionmail.org and we will provide a link for you to download your data. Your DBCODE is: 18ZVPB** 就是数据被删除了，需要支付一定的 btc 才可以恢复数据。

# 解决

- 关闭默认的端口 27017
- 修改配置文件 auth = true
- bindIp 修改为内网
- 然后重新启动容器得到解决

```bash
docker run --name mongo --restart=always -p 3009:27017 --net=mynet2 -v /data/mdb:/data/db -v /data/backup/mongodb:/data/backup -v /data/mdblog:/data/log -v /data/mongo_conf:/data/conf -d mongo
```
