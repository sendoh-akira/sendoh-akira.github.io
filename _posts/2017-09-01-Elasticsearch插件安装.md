---
layout: post
title: Elasticsearch 插件安装
category: 技术
tags: 大数据
description: Elasticsearch 插件安装
---

> Elasticsearch 插件安装


# 安装安全插件x-pack

安装插件命令

1. 在线安装

          bin/elasticsearch-plugin install x-pack

2. 离线安装

      下载安装包

        https://artifacts.elastic.co/downloads/packs/x-pack/x-pack-5.2.1.zip

      然后放在/home/es目录下。进入bin目录

        cd  /home/es/elasticsearch-5.2.1/bin

      然后执行

        ./elasticsearch-plugin install /home/es/x-pack-5.2.1.zip

默认用户名密码为：

    elastic:changeme

移除插件命令

    bin/elasticsearch-plugin remove x-pack

# kibana安装（图形化界面组件）

下载kibana-5.2.1-linux-x86_64.tar.gz，然后放置在/home/es

    wget kibana-5.2.1-linux-x86_64.tar.gz
    mv kibana-5.2.1-linux-x86_64.tar.gz /home/es

然后使用es用户进行解压

    tar -zxvf  kibana-5.2.1-linux-x86_64.tar.gz

修改kibana.yml配置文件

    vi  /home/es/kibana-5.2.1-linux-x86_64/config/kibana.yml

    #解开注解并修改：
    server.host: "192.168.1.211"
    #解开注解并修改：
    #elasticsearch.url: "http://192.168.1.211:9200"
    #解开注解并修改：
    elasticsearch.username: "elastic"
    elasticsearch.password: "changeme"

然后进入kibana安装目录

    cd /home/es/kibana-5.2.1-linux-x86_64/bin

执行，安装x-pack组件

    ./kibana-plugin install file:///home/es/x-pack-5.2.1.zip

启动kibana

先启动ES

首先进入bin目录

    cd /home/es/kibana-5.2.1-linux-x86_64/bin

然后执行

    ./kibana

验证

在浏览器上输入：http://192.168.1.211:5601/ 可以打开Kibana，此时需要输入用户名和密码登录，默认分别是 elastic 和 changeme



# Elasearch安装IK分词器

下载地址

[https://github.com/medcl/elasticsearch-analysis-ik](https://github.com/medcl/elasticsearch-analysis-ik)


在windows下解压到当前文件夹，首先查看pom文件版本号，修改为与es匹配的版本

如5.2.1

    <elasticsearch.version>5.2.1</elasticsearch.version>

在文件夹内右键此处打开命令窗口，输出命令

    mvn clean package

如果电脑没有安装maven，可以把下载的ik项目导入eclipse里进行打包。
eclipse-import > maven project > --修改jre环境为jdk环境

打包成功以后，会生成一个target文件夹(可以在控制台窗口显示target包所在目录)，找到elasticsearch-analysis-ik-5.2.1.zip，这就是我们需要的安装文件。

将elasticsearch-analysis-ik-5.2.1.zip上传到/home/es/elasticsearch-5.2.1/plugins目录下，然后进入plugins目录下

修改文件夹权限

    chown es:es elasticsearch-analysis-ik-5.2.1.zip

切换成es用户，进行解压unzip elasticsearch-analysis-ik-5.2.1.zip 生成一个elasticsearch文件夹

    su -es  

    unzip elasticsearch-analysis-ik-5.2.1.zip

然后重命名为ik

    mv elasticsearch ik

最后删除elasticsearch-analysis-ik-5.2.1.zip压缩包

    rm -rf elasticsearch-analysis-ik-5.2.1.zip

配置分词器

更改配置文件

    vi elasticsearch-5.2.1/plugins/analysis-ik/config/IKAnalyzer.cfg.xml

    #配置内容
    <?xml version="1.0" encoding="UTF-8"?>
    <!DOCTYPE properties SYSTEM "http://java.sun.com/dtd/properties.dtd">
    <properties>
            <comment>IK Analyzer 扩展配置</comment>
            <!--用户可以在这里配置自己的扩展字典 -->
            <entrykey="ext_dict"> custom/mydict.dic;custom/sougou.dic;custom/single_word_low_freq.dicen</entrykey>
            <!--用户可以在这里配置自己的扩展停止词字典-->
            <entry key="ext_stopwords">custom/ext_stopword.dic</entry>
            <!--用户可以在这里配置远程扩展字典 -->
            <!-- <entry key="remote_ext_dict">words_location</entry> -->
            <!--用户可以在这里配置远程扩展停止词字典-->
            <!-- <entry key="remote_ext_stopwords">words_location</entry> -->
    </properties>
