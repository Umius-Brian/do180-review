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

mysql -uuser1 -pmypa55 -h localhost --protocol tcp 
> Used after oc port-forward command

# Volume mount
mkdir -pv /home/student/local/mysql
sudo semanage fcontext -a -t container_file_t '/home/student/local/mysql(/.*)?'
sudo restorecon -R /home/student/local/mysql
podman unshare chown -Rv 27:27 /home/student/local/mysql
podman unshare ls -ldZ /home/student/local/mysql

# Differences
podman diff official-httpd

# Create new-app
oc new-app --template=mysql-persistent -p MYSQL_USER=user1 -p MYSQL_PASSWORD=mypa55 -p MYSQL_ROOT_PASSWORD=r00tpa55 -p MYSQL_DATABASE=testdb -p VOLUME_CAPACITY=10Gi

oc new-app --name php-helloworld --docker-image=quay.io/redhattraining/php-hello-dockerfile

oc new-app php~http://my.git.server.com/my-app --name=myapp
oc new-app -i php http://my.git.server.com/my-app --name=myapp

oc new-app .

oc new-app http://github.com/openshift/sti-ruby.git --context-dir=2.0/test

oc new-app https://github.com/openshift/ruby-hello-world.git#beta4

oc new-app php~http://services.lab.example.com/app -o json --name=myapp > s2i.json

oc new-app php:7.3 --name php-helloworld https://github.com/${RHT_OCP4_GITHUB_USER}/DO180-apps#s2i --context-dir php-helloworld
