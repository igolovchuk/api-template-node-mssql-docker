# API template NODE-MSSQL-DOCKER deployed with Pulumi
Node API with SQL server baked into a single Docker image, with ability to upload to AWS using pulumi

## Prerequisits

- [Build&Run](https://www.docker.com/products/docker-desktop): Docker installed
- [Build&Run](https://nodejs.org/en/): Node LTS installed
- [Build&Run](https://classic.yarnpkg.com/lang/en/docs/install): Yarn installed
- [Deploy](https://www.pulumi.com/docs/get-started/install/): Pulumi installed and logged in
- [Deploy](https://aws.amazon.com/console): AWS account created
- [Deploy](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html): AWS CLI installed and aconfigured (`~/.aws/credentials` has the profile which will be used in `Pulumi.dev.yaml`)

## Command examples for manual build & run in cmd, not for ruunig this file.

> NOTE: PLEASE DO NOT STORE THE REAL SECRETS IN FIlES AND NOT COMMIT THEM TO REPO.

Build:
```
docker build --build-arg DB_USERNAME=sa --build-arg DB_PASSWORD=Passw123  -t test/node-sql-api .
```
Run:
```
docker run -p 80:80 test/node-sql-api
```

The endpoints below should be accessible:
```
GET: http://localhost/v1/health
GET: http://localhost/v1/products
```
