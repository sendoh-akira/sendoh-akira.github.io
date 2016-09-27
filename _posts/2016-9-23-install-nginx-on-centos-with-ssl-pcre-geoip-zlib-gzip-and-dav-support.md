---
layout: post
title: 'Install Nginx On CentOS With SSL, PCRE, GeoIP, Zlib, Gzip And DAV Support'
category: 技术
tags: nginx
description: install nginx on centos
---

> Nginx (pronounced "engine x") is a free, open-source, high-performance HTTP server. Nginx is known for its stability, rich feature set, simple configuration, and low resource consumption. This tutorial shows how you can compile and install Nginx on CentOS server with SSL, PCRE, GeoIP, Zlib, Gzip and DAV supp

# Add a repo for some packages that we need:

[Install EPEL, IUS, and Remi repositories on CentOS and Red Hat] (<https://support.rackspace.com/how-to/install-epel-and-additional-repositories-on-centos-and-red-hat/>)

EPEL(Extra Packages for Enterprise Linux) Repo是Linux发行版中最大的软件仓库之一，免费，丰富的软件包更新。

```
# rpm -Uvh http://dl.fedoraproject.org/pub/epel/6/x86_64/epel-rpm-macros-6-11.noarch.rpm   
```

# Pre-Installation

First we install httpd-devel, pcre, pcre-devel, zlib, zlib-devel, perl, geoip and geoip-devel  gcc gcc-c++ packages like this:

```
# yum install -y httpd-devel pcre perl pcre-devel zlib zlib-devel GeoIP GeoIP-devel  gcc gcc-c++
```

Create group and user for nginx

```
# /usr/sbin/groupadd -f nginx
# /usr/sbin/useradd -g nginx nginx
```

# Download required packages

```
# cd /usr/local/src/
# wget ftp://ftp.csx.cam.ac.uk/pub/software/programming/pcre/pcre-8.38.tar.gz
# wget http://zlib.net/zlib-1.2.8.tar.gz
# wget https://www.openssl.org/source/openssl-1.0.1u.tar.gz
```

# Now you have to untar these files.

```
# tar -xvf pcre-8.38
# tar -xvf zlib-1.2.8.tar.gz
# tar -xvf openssl-1.0.1u.tar.gz
```

# Download Nginx source package

You need to download Nginx source package from [nginx.org](http://nginx.org/),nginx wiki from [nginx wiki] (<https://www.nginx.com/resources/wiki/>)

```
# cd /usr/local/src/
# wget  http://nginx.org/download/nginx-1.11.4.tar.gz
# tar -xvf nginx-1.11.4.tar.gz
# cd nginx-1.11.4
```

# Compile and Install Nginx

Now you can compile and install Nginx with the following commands:

```
# ./configure \
    --user=nginx  \
    --group=nginx  \
    --prefix=/usr/local/develop/nginx  \
    --sbin-path=/usr/local/develop/nginx/bin/nginx  \
    --conf-path=/usr/local/develop/nginx/etc/nginx.conf  \
    --error-log-path=/usr/local/develop/nginx/log/error.log  \
    --http-log-path=/usr/local/develop/nginx/log/access.log  \
    --http-client-body-temp-path=/var/lib/nginx/tmp/client_body  \
    --http-proxy-temp-path=/var/lib/nginx/tmp/proxy  \
    --http-fastcgi-temp-path=/var/lib/nginx/tmp/fastcgi  \
    --pid-path=/usr/local/develop/nginx/pid/nginx.pid  \
    --lock-path=/var/lock/subsys/nginx  \
    --with-http_ssl_module  \
    --with-http_realip_module  \
    --with-http_addition_module  \
    --with-http_sub_module  \
    --with-http_dav_module \
    --with-http_flv_module \
    --with-http_gzip_static_module \
    --with-http_stub_status_module \
    --with-mail \
    --with-mail_ssl_module \
    --with-openssl=../openssl-1.0.1u \
    --with-pcre \
    --with-pcre=../pcre-8.38 \
    --with-zlib=../zlib-1.2.8 \
    --with-http_geoip_module \
```

You can find out more options by using the following command:

	```
	# ./configure --help
	```
# Now run:

	```
	#make
	#make install
	```

# Configuration Summary

```
nginx path prefix: "/usr/local/nginx"
nginx binary file: "/usr/local/nginx/sbin/nginx"
nginx configuration prefix: "/usr/local/nginx/conf"
nginx configuration file: "/usr/local/nginx/conf/nginx.conf"
nginx pid file: "/usr/local/nginx/logs/nginx.pid"
nginx error log file: "/usr/local/nginx/logs/error.log"
nginx http access log file: "/usr/local/nginx/logs/access.log"
nginx http client request body temporary files: "client_body_temp"
nginx http proxy temporary files: "proxy_temp"
nginx http fastcgi temporary files: "fastcgi_temp"
```

# Start Nginx Server

```
# /usr/local/develop/nginx/bin/nginx -c/usr/local/develop/nginx/etc/nginx.conf
```

# Stop Nginx Server

```
# /usr/local/develop/nginx/bin/nginx -s stop
```

# Testing

```
# /usr/local/develop/nginx/bin/nginx -V
```

# brower

```
http://ip/
```

[reference by the blog](https://www.howtoforge.com/install-nginx-on-centos-5.5-with-ssl-pcre-geoip-zlib-gzip-and-dav-support)
