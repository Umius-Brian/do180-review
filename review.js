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

# 7
podman cp /home/student/DO180/labs/manage-lifecycle/db.sql mysql:/
podman exec mysql /bin/bash -c 'mysql -uuser1 -pmypa55 items < /db.sql'
podman exec mysql /bin/bash -c 'mysql -uuser1 -pmypa55 -e "select * from items.Projects;"'


# 8
# First make local directory for volume mount
mkdir -pv /home/student/local/mysql
ls -ldZ /home/student/local/mysql
sudo semanage fcontext -a -t container_file_t '/home/student/local/mysql(/.*)?'
sudo restorecon -R /home/student/local/mysql
ls -ldZ /home/student/local/mysql
podman unshare chown 27:27 /home/student/local/mysql
podman login registry.redhat.io
podman pull registry.redhat.io/rhel8/mysql-80:1

podman run --name <app_name> -d -v /home/student/local/mysql:/var/lib/mysql/data -e -e -e -e registry.redhat.io/rhel8/mysql-80:1

ls -ld /home/student/local/mysql/items
podman unshare ls -ld /home/student/local/mysql/items


# 9
podman run --name mysqldb-port -d -v /home/student/local/mysql:/var/lib/mysql/data -p 13306:3306 -e -e -e -e registry.redhat.io/rhel8/
