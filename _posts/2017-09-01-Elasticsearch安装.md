---
layout: post
title: Elasticsearch 安装
category: 技术
tags: 大数据
description: Elasticsearch 安装
---

> Elasticsearch 安装

# 安装环境概述


3台机器部署：
  node1:192.168.1.201
  node2:192.168.1.202
  node3:192.168.1.203
  jdk8、es5.2.1、kibana5.2.1、x-pack、ik

node1、node2、node3都需要安装

# 创建或使用已有的非root用户

Es只能以非root用户启用

    useradd es
    passwd  es
    #回车输入密码

# 使用root用户登录

    su - root

修改文件/etc/sysctl.conf

    vi /etc/sysctl.conf

    #在文件末尾处添加
    vm.max_map_count=655360

生效并查看是否更改成功（此步骤必须执行，才可以刷新sysctl.conf生效）

    sysctl -p

    #显示以下内容表示更改成功
    vm.max_map_count = 262144

修改文件/etc/security/limits.conf

    vi /etc/security/limits.conf

    #在文件末尾处添加 * 为匹配所有用户
    * hard nofile 65536
    * soft nofile 131072
    * soft nproc 2048
    * hard nproc 4096

修改后用es用户登录查看是否成功

    ulimit -Hn

    #输出以下内容标识修改成功
    65536

使用es用户登录解压 elasticsearch-5.1.1.tar.gz

    tar –zxvf elasticsearch-5.1.1.tar.gz

<font color="red">注意：解压过程中每个es会生成一个uuid，所以不要scp拷贝，这样uuid一样会出问题，每台机器要分开解压</font>

修改Es配置文件

    vi  /opt/elasticsearch/config/elasticsearch.yml

    #此机器elasticsearch节点名称，各机器不能重复
    cluster.name: es-cluster

    #本机ip
    network.host: 192.168.1.203  

    #各个机器的名称
    node.name: node1

    #数据存放目录（可修改）  
    path.data: /home/es/elasticsearch-5.2.1/data

    #日志存放目录（可修改）  
    path.logs: /home/es/elasticsearch-5.2.1/logs

    bootstrap.memory_lock: false

    #(此项如果没有则添加上)
    bootstrap.system_call_filter: false

    #设置集群中master节点的初始列表，可以通过这些节点来自动发现新加入集群的节点(配置两个，三个都可以)
    discovery.zen.ping.unicast.hosts: ["192.168.1.201", "192.168.1.202"]

    #设置这个参数来保证集群中的节点可以知道其它N个有master资格的节点。默认为1，对于大的集群来说，可以设置大一点的值（2-4）  
    discovery.zen.minimum_master_nodes: 2

    #(不需要配置)
    http.cors.enabled: true
    #(不需要配置)
    http.cors.allow-origin: "*"

    action.auto_create_index: .security,.monitoring*,.watches,.triggered_watches,.watcher-history*

修改jvm.options ，看机器配置，越大越好，默认为2g

    vi  /home/es/elasticsearch-5.2.1/config/jvm.options

    -Xms256m
    -Xmx256m

修改90-nproc.conf(需要使用root用户进行修改)
注：该目录下也可能是20-nproc.conf这个文件，名字不固定  

    vi /etc/security/limits.d/90-nproc.conf

    # * soft nproc 1024 改为 soft nproc 2048
    * soft nproc 2048

启动Es

    cd elasticsearch/bin

    ./elasticsearch

参考文档

Es java api

[https://www.elastic.co/guide/en/elasticsearch/client/java-api/current/java-search.html](https://www.elastic.co/guide/en/elasticsearch/client/java-api/current/java-search.html)

es分页

[http://www.sojson.com/blog/90.html](http://www.sojson.com/blog/90.html)

x-pack 安全

[https://www.elastic.co/guide/en/x-pack/current/_how_authentication_works.html](https://www.elastic.co/guide/en/x-pack/current/_how_authentication_works.html)

esik分词器

[http://blog.csdn.net/fenglailea/article/details/55506775](http://blog.csdn.net/fenglailea/article/details/55506775)

es 高亮

[http://blog.csdn.net/lu_wei_wei/article/details/51055209](http://blog.csdn.net/lu_wei_wei/article/details/51055209)
