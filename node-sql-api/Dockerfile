FROM mcr.microsoft.com/mssql/server:2019-latest as mssqlBuild
#FROM node:14 as build

ARG DB_USERNAME
ARG DB_PASSWORD

ENV PORT=80
ENV DB_USERNAME=$DB_USERNAME
ENV DB_PASSWORD=$DB_PASSWORD

#MSSQL Required variables
ENV ACCEPT_EULA=Y
ENV SA_PASSWORD=$DB_PASSWORD
# Full list of licenses available here: https://hub.docker.com/_/microsoft-mssql-server
ENV MSSQL_PID=Express

# Switch to root user for access to apt-get install
USER root

# Install node/npm
RUN apt-get -y update --no-install-recommends  && \
        apt-get install -y curl --no-install-recommends && \
        curl -sL https://deb.nodesource.com/setup_14.x | bash - && \
        apt-get install -y nodejs --no-install-recommends && \
        apt-get install -y dos2unix --no-install-recommends && \
        rm -rf /var/lib/apt/lists/*

# Install yarn
RUN npm install -g yarn

# Create app directory
WORKDIR /app

# Step 1: install dependencies
COPY package.json .
COPY yarn.lock .
COPY tsconfig.json .
RUN yarn install
# RUN yarn install --production=true

# Step 2: Build app
COPY . .
RUN yarn build

# Step 2: Run app
COPY dist .

RUN dos2unix *

# Grant permissions for the import-data script to be executable
RUN chmod +x scripts/import-data.sh

# Exposing tcp port.
EXPOSE $PORT

# Switch back to mssql user and run the entrypoint script
USER mssql
ENTRYPOINT /bin/bash ./scripts/entrypoint.sh
