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


# 9
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

# 11
podman login registry.redhat.io
podman run
podman ps
mysql -uuser1 -pmypa55 -h 127.0.0.1 -P13306 items < /home/student/DO180/labs/manage-networking/db.sql

mysql -uuser1 -pmypa55 -h 127.0.0.1 -P13306 items -e "select * from Item"

podman exec -it mysqldb-port mysql -uroot items -e "select * from Item"

podman exec -it mysqldb-port /bin/bash
bash-4.4$ mysql -uroot items -e "select * from Items"

# 12
podman unshare chown -Rv 27:27 /home/student/local/mysql

# 15
podman login quay.io
> brian_bui_ibm
> same pw
podman run 
podman exec
echo
curl
podman diff
podman stop
podman commit -a 'Brian' official-httpd do180-custom-httpd
podman images
podman login quay.io
podman tag do180-custom-httpd quay.io/${RHT_OCP4_QUAY_USER}/do180-custom-httpd:v1.0
podman push quay.io/${RHT_OCP4_QUAY_USER}/do180-custom-httpd:v1.0
podman pull -q quay.io/${RHT_OCP4_QUAY_USER}/do180-custom-httpd:v1.0
> -q suppresses output info when pulling images
podman run -d --name test-httpd -p 8280:80 ${RHT_OCP4_QUAY_USER}/do180-custom-httpd:v1.0

curl localhost:8280/do180.html

# 18
vim /home/student/DO180/labs/dockerfile-create/Containerfile
cd /home/student/DO180/labs/dockerfile-create
podman build --layers=false -t do180/apache .
> layers false deletes intermediate images
podman images
podman run -d --name lab-apache -p 10080:80 do180/apache
podman ps
curl 127.0.0.1:10080

# 21
oc login -u ${RHT_OCP4_DEV_USER} -p ${RHT_OCP4_DEV_PASSWORD} {RHT_OCP4_MASTER_API}
oc new-project ${RHT_OCP4_DEV_USER}-mysql-openshift

oc new-app --template=mysql-persistent -p MYSQL_USER=user1 -p MYSQL_PASSWORD=mypa55 -p MYSQL_ROOT_PASSWORD=r00tpa55 -p MYSQL_DATABASE=testdb -p VOLUME_CAPACITY=10Gi

oc status
oc get all
oc get pods
oc get pods -w
oc get svc
oc get pvc
oc describe pod mysql-1
oc describe svc/mysql-1
oc describe pvc/mysql-1
oc port-forward mysql-1 3306:3306
mysql -uuser1 -pmypa55 --protocol tcp -h localhost
oc delete project ${RHT_OCP4_DEV_USER}-mysql-openshift

# 22
oc expose svc/php-helloworld
oc describe route
oc delete route/php-helloworld

# Misc
oc get <resource_type> <resource_name> -o yaml
oc get -is -n openshift
oc get svc, deployments -l app=nexus
oc get builds
oc get bc
oc edit
oc exec <container_id>
oc logs build/myapp-1
oc start-build myapp





