# Mirror

[![Build Status](https://travis-ci.org/LoeiFy/Mirror.svg?branch=master)](https://travis-ci.org/LoeiFy/Mirror)

A blogging tool powered by GitHub. Write your blog on GitHub issues.

https://mirror.am0200.com/

## Install

```sh
npm i -g @xrr2016/mirror
```

## Documentation

## Usage

```bash
$ cd blog
$ mirror init
```

OR

```bash
$ mirror init blog
```

### Config

首先获取你的 [token](https://github.com/LoeiFy/Mirror/wiki/Token-%E8%AE%BE%E7%BD%AE), 然后修改 `config.yml`

```yml
# 是否为组织项目
organization: false

# 文章排序，依据更新时间还是创建时间
# 值为 'UPDATED_AT' 或者 'CREATED_AT'
order: 'UPDATED_AT'

# 网站标题
title:

# GitHub 用户名或者组织名
user:

# 项目名称，项目里面的 issues 是你的博客内容
# 如果你的项目是组织项目，请设置 'organization' 为 true
repository:

# 多用户设置，上面设置的 user 用户名默认已经包括
# 多用户名字必须用 ',' 分割
# 例子: author0,author1
authors:

# token 设置
# token 必须以 '#' 分割
# 如果你的 token 是 5c31bffc137f44faf7efc4a84da827g7ca2cfeaa
# 那么这里填入的值为 5#c31bffc137f44faf7efc4a84da827g7ca2cfeaa
token:

# 文章列表分页
perpage: 10
```

这里有一个例子 [config](https://github.com/LoeiFy/Mirror/wiki/Config-example)

### 生成你的博客

```bash
$ mirror build
```

### 发布你的博客

将所有内容都 push 到一个项目的 `gh-pages` 分支，你也可以在 `CNAME` 上定义你的域名

## Development

https://github.com/LoeiFy/Mirror/wiki/Development

## License

MIT

## Related

![mirror](https://cloud.githubusercontent.com/assets/2193211/12321915/c66d8b12-baeb-11e5-9612-b188f5272e3b.jpg)

`Mirror` by `DJ Okawari`
