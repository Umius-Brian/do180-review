podman login registry.redhat.io


podman run -d --name <app_name> -e -e -e registry.redhat.io/rhel8/mysql-80:1


podman exec -it <app_name> /bin/bash
bash-4.2$ hostname
bash-4.2$ whoami
bash-4.2$ id
bash-4.2$ mysql -uroot
mysql> show databases;
mysql> use items;
mysql> CREATE TABLE Projects (id int NOT NULL, name varchar(255) DEFAULT NULL, code varchar(255) DEFAULT NULL, PRIMARY KEY (id));
mysql> show tables;
mysql> insert into Projects (id, name, code) values (1, 'DevOps', 'DO180');
mysql> select * from Projects;
mysql> exit;


sudo podman run --rm -it --name asroot <registry_name> /bin/bash
sudo ps -ef | grep 'sleep 1000'

podman exec -it httpd-basic /bin/bash
bash-4.4# ls -la /var/www/html
