# Run
podman run -d --rm -it -v /home/student/local/mysql:/var/lib/mysql/data -p 13306:3306 -e -e -e -e registry.redhat.io/rhel8/mysql-80:1

# MySQL exec (from ~)
podman exec mysql /bin/bash -c 'mysql -uuser1 -pmypa55 items < /db.sql'

podman exec mysql /bin/bash -c 'mysql -uuser1 -pmypa55 -e "select * from items.Projects;"'

mysql -uuser1 -pmypa55 -h 127.0.0.1 -P13306 items < /home/student/DO180/labs/manage-networking/db.sql

# Verify MySQL 
podman exec -it mysqldb-port mysql -uroot items -e "select * from Item"
> Non-interactive

mysql -uuser1 -pmypa55 -h 127.0.0.1 -P13306 items -e "select * from Item"
> Port-forwarding

podman exec -it mysqldb-port /bin/bash
bash-4.4$ mysql -uroot items -e "select * from items"
> Interactive

# Volume mount
mkdir -pv /home/student/local/mysql
sudo semanage fcontext -a -t container_file_t '/home/student/local/mysql(/.*)?'
sudo restorecon -R /home/student/local/mysql
podman unshare chown -Rv 27:27 /home/student/local/mysql
podman unshare ls -ldZ /home/student/local/mysql

# Differences
podman diff official-httpd

