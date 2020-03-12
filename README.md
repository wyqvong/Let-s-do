# 小程序开发 Let's do

2020.2.28建

## 功能介绍

- 可设置备忘录，上课前30分钟提醒上课。

- 提供了天院特色地图。

- 为用户提供部分常见的可选择的食物，可手动输入并保存备选物品。

- 在用户选择出的若干个备选物品里随机选择一个。

## 云数据库设计

### places集合

|字段|类型|值|
|---|----|----|
|_id|string|369362ab-d943-4e9c-bcf8-56101e8ec289|
|id|number|1|
|placeAddress|string|广东技术师范大学(天河学院)|
|placeLatitude|string|23.259104|
|placeLongitude|string|113.456706|
|placeName|string|我们的天院啊|

### foods集合

|字段|类型|值|
|---|----|----|
|_id|string|69105b50-dda5-463d-a041-361299b513f0|
|name|string|方便面|
|time|string|三餐|

## 项目工具

- 微信开发者工具、微信公众平台

- vscode

## ui框架

- iview

## 技术栈

- 小程序

- html+css+js

- node.js

- MongoDB

## 项目日志

- 2.28 项目初始化，初步设想由index及user两个page来完成整个项目

- 3.1 设计并且连接上云数据库

- 3.4 完成添加备选和随机抽取功能

- 3.5 小程序上架成功，计划扩张项目规模，由专为食物扩展为各类服务

- 3.6 完善样式

- 3.8 形成了index下eat(吃饭)、market(购物)、random(获取随机数)的三种分类，并完成了地图模块和地图的标记功能。

- 3.9 加入了推送订阅消息的功能，预订 定时推送每日课程提醒 功能。

- 3.10 完成 定时推送每日课程提醒 功能

- 3.11 完善表单页样式,完成 添加标记点 功能

- 3.12 设置上课前半小时发送推送

## 小程序开发参考文档

- [云开发文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html)
