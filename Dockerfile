# Pull stock Debian image for Docker
FROM ubuntu:latest
RUN mkdir /var/www
ADD . /var/www

# Setup Container for Site
# Installs nodejs, mysql-common, python resources
RUN apt-get update
RUN export DEBIAN_FRONTEND=noninteractive
RUN apt-get install -y curl mysql-server python3 python3-django
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - 
RUN apt-get install -y nodejs

# Install Site
WORKDIR /var/www/sylvan-library
RUN npm install

# CMD init
CMD ../.container/init

### MySQL setup is going to be in the init file