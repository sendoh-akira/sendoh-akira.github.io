---
layout: post
title: 在linux下安装mysql
category: 技术
tags: java mysql linux
description: 在linux下安装mysql server
---

> 在linux下进行安装mysql server

# 安装前准备

MySQL 依赖 libaio,所以先要安装 libaio
yum-based systems:

	# search for info
	yum search libaio
	# install library
	yum install libaio

APT-based systems:

	# search for info
	apt-cache search libaio
	# install library
	apt-get install libaio

# 使用yum库在线安装

MySQL 提供了一个Yum格式的软件库可以在Linux平台发现:

EL5, EL6, and EL7-based platforms (for example, the corresponding versions of Red Hat Enterprise Linux, Oracle Linux, and CentOS) Fedora 23 and 24


## 添加 MySQL Yum 库

1. MySQL Server Yum 库主页 (http://dev.mysql.com/downloads/repo/yum/) in the MySQL Developer Zone.
2. 选择并下载对应系统库到本地
3. 通过命令安装


		sudo yum localinstall platform-and-version-specific-package-name.rpm


	EL6-based system:

		sudo yum localinstall mysql57-community-release-el6-{version-number}.noarch.rpm

	EL7-based system:

		sudo yum localinstall mysql57-community-release-el7-{version-number}.noarch.rpm

	EL5-based system:

		sudo rpm -Uvh mysql57-community-release-el5-{version-number}.noarch.rpm


4. 检查是否安装成功
```
yum repolist enabled | grep "mysql.*-community.*"
```

## 选择发布版本的库

1. 查看可用版本

		yum repolist all | grep mysql


2. 支持yum-config-manager

	选择要启用/停用的mysql服务

		sudo yum-config-manager --disable mysql57-community
		sudo yum-config-manager --enable mysql56-community


	或者修改配置文件

		vi /etc/yum.repos.d/mysql-community.repo

	停用：

		enabled=0 disable

	启用：

		enabled=1 enable

	安装mysql5.7yum库


		[mysql57-community]

		name=MySQL 5.7 Community Server baseurl=http://repo.mysql.com/yum/mysql-5.7-community/el/6/$basearch/
		enabled=1

		gpgcheck=1

		gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-mysql



	安装mysql5.6 yum库


		#Enable to use MySQL 5.6
		[mysql56-community]

		name=MySQL 5.6 Community Server
		baseurl=http://repo.mysql.com/yum/mysql-5.6-community/el/6/$basearch/
		enabled=1

		gpgcheck=1
		gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-mysql


	检查生效的库

		yum repolist enabled | grep mysql

3. 安装MySQL

	安装MySQL

		sudo yum install mysql-community-server

4. 启动MySQL Server

	启动MySQL Server

		sudo service mysqld start

	启动成功输出结果：

		Starting mysqld:[ OK ]

	检查MySQL server 状态

		sudo service mysqld status

	检查MySQL server 状态输出结果

		mysqld (pid 3066) is running.

## 其他

安全策略
	```
	mysql_secure_installation
	```

<strong>忘记密码处理</strong>


1. 进入mysql安装目录


	5.7以后使用authentication_string
	Update mysql.user set authentication_string=password('root') where user='root' ;
	FLUSH PRIVILEGES;

	抛出警告信息
	Your password does not satisfy the current policy requirements

	关闭安全策略

		vi /etc/my.cnf  

	末尾追加

		validate_password = OFF


	安全模式下修改密码

	安全模式下启动服务

		./bin/mysqld_safe   --user=root --skip-grant-tables &


	进入mysql,修改密码
		mysql -u root
		mysql -u root

		UPDATE mysql.user SET Password = PASSWORD('new_password')  WHERE User = 'root';

		FLUSH PRIVILEGES;

2. 使用mysqladmin

		shell> mysqladmin -u root password "new_password"

## 初始化数据库


1. 找到mysql安装目录，这里引用使用MYSQL_HOME

		cd $MYSQL_HOME

2. 改变文件夹权限修改文件

		chown -R mysql .
		chgrp -R mysql .
3. 初始化数据库

		scripts/mysql_install_db --user=mysql

	可指定安装选项

		scripts/mysql_install_db --user=mysql \ --basedir=/usr/local/apps/mysql \ --datadir=/usr/local/apps/mysql/data

	mysqlinstalldb 选项

	|Format|Description|Introduced|Deprecated|
	|--basedir|Path to base directory|||
	|--builddir|Path to build directory (for out-of-source builds)|||
	|--cross-bootstrap|For internal use|||
	|--datadir|Path to data directory|||
	|--defaults-extra-file|Read named option file in addition to usual option files|||
	|--defaults-file|Read only named option file|||
	|--force|Run even if DNS does not work|||
	|--help|Display help message and exit|||
	|--keep-my-cnf|Keep existing my.cnf file, do not create new one|5.6.20|5.6.20|
	|--ldata|Synonym for --datadir|||
	|--no-defaults|Read no option files|||
	|--random-passwords|Generate administrative account random password|5.6.8||
	|--rpm|For internal use|||
	|--skip-name-resolve|Use IP addresses rather than host names in grant tables|||
	|--srcdir|For internal use|||
	|--user|System login user under which to execute mysqld|||
	|--verbose|Verbose mode|||
	|--windows|For internal use|||

4. 设置最终文件权限

		chown -R root .
		chown -R mysql data
5. 启动配置

	/etc/my.cnf or /etc/mysql/my.cnf file

		vi	/etc/mysql/my.cnf

## Mysql服务

1. 开机启动Mysql服务设置，进入mysql目录执行下面命令：

		cp mysql.server /etc/init.d/mysql
		chmod +x /etc/init.d/mysql

2. 添加mysql用户
	chkconfig --add mysql

3. mysql.server 选项设置，在 /etc/my.cnf file

		[mysqld]

		datadir=/usr/local/mysql/var

		socket=/var/tmp/mysql.sock

		port=3306

		user=mysql

		[mysql.server]

		basedir=/usr/local/mysql

4. mysql.server 选项

	|Format|Description|
	|--basedir|Path to MySQL installation directory|
	|--datadir|Path to MySQL data directory|
	|--pid-file|File in which server should write its process ID|
	|--service-startup-timeout|How long to wait for server startup|

# 在 Unix/Linux 使用通用的二进制文件安装

1. 下载文件



2. 安装 mysql

		groupadd mysql
		useradd -r -g mysql -s /bin/false mysql
		cd /usr/local/apps/
		tar zxvf /path/to/mysql-VERSION-OS.tar.gz
		ln -s full-path-to-mysql-VERSION-OS mysql
		cd mysql
		chown -R mysql .
		chgrp -R mysql .
		scripts/mysql_install_db --user=mysql
		chown -R root .
		chown -R mysql data
		bin/mysqld_safe --user=mysql &
		# Next command is optional
		cp support-files/mysql.server /etc/init.d/mysql.server

3. 环境变量配置

		vi /etc/profile

   末尾追加

	   MYSQL_HOME = /usr/local/apps/mysql
	   export PATH=$PATH:$MYSQL_HOME/bin

# 其他

1. 设置编码格式

   找到mysql启动配置文件，如my.cnf

		vi my.cnf

   追加以下内容

		[mysqld]   
		character_set_server = utf8

		[mysql]
		default-character-set = utf8

	进入mysql，查看字符编码

		SHOW VARIABLES LIKE 'character%'

	其他常用参数

		[mysqld]   
		basedir      = path          # 使用给定目录作为根目录(安装目录)。
		datadir      = path          # 从给定目录读取数据库文件。
		pid-file     = filename      # 为mysqld程序指定一个存放进程ID的文件(仅适用于UNIX/Linux系统);


		socket = /tmp/mysql.sock     # 为MySQL客户程序与服务器之间的本地通信指定一个套接字文件(Linux下默认是/var/lib/mysql/mysql.sock文件)
		port             = 3306      # 指定MsSQL侦听的端口
		key_buffer       = 384M      # key_buffer是用于索引块的缓冲区大小，增加它可得到更好处理的索引(对所有读和多重写)。
									   索引块是缓冲的并且被所有的线程共享，key_buffer的大小视内存大小而定。
		table_cache      = 512       # 为所有线程打开表的数量。增加该值能增加mysqld要求的文件描述符的数量。可以避免频繁的打开数据表产生的开销
		sort_buffer_size = 2M        # 每个需要进行排序的线程分配该大小的一个缓冲区。增加这值加速ORDER BY或GROUP BY操作。
									   注意：该参数对应的分配内存是每连接独占！如果有100个连接，那么实际分配的总共排序缓冲区大小为100×6=600MB
		read_buffer_size = 2M        # 读查询操作所能使用的缓冲区大小。和sort_buffer_size一样，该参数对应的分配内存也是每连接独享。
		query_cache_size = 32M       # 指定MySQL查询结果缓冲区的大小
		read_rnd_buffer_size    = 8M # 改参数在使用行指针排序之后，随机读用的。
		myisam_sort_buffer_size =64M # MyISAM表发生变化时重新排序所需的缓冲
		thread_concurrency      = 8 # 最大并发线程数，取值为服务器逻辑CPU数量×2，如果CPU支持H.T超线程，再×2
		thread_cache            = 8 # #缓存可重用的线程数
		skip-locking                 # 避免MySQL的外部锁定，减少出错几率增强稳定性。
		[mysqldump]
		max_allowed_packet      =16M # 服务器和客户端之间最大能发送的可能信息包

		[myisamchk]
		key_buffer   = 256M
		sort_buffer = 256M
		read_buffer = 2M
		write_buffer = 2M
2. 备份，还原

	备份

		mysqldump --socket=/usr/local/apps/mysql/data/mysql/mysql.sock --single-transaction=TRUE  -u root -p emsc > emsc.sql

	还原

		mysql --socket=/usr/local/apps/mysql/data/mysql/mysql.sock  -u root -p emsc < emsc.sql
