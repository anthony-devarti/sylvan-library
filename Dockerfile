# Pull stock Debian image for Docker
FROM debian:latest
RUN mkdir /var/www
ADD . /var/www

# Setup Container for Site
# Installs nodejs, mysql-common, python resources
RUN apt-get update
RUN apt-get install -y curl mysql-common python3 python3-django
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - 
RUN apt-get install -y nodejs

# Setup MySQL
RUN mv /var/www/sylvan-library/mysql/ /etc/mysql

# Install Site
WORKDIR /var/www/sylvan-library
RUN npm install

# CMD init
