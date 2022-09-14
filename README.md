# lambda

## How to deploy

- Run `npm run zip`
- On AWS Console, go to lambda and use the option `Upload from` -> `.zip file

## env
```
APP_KEY
APP_SECRET
```

## Available scripts

`npm run zip`
Zip all the files to upload them to AWS.

`npm run test`
Run unit test suite.

`npm run test:watch`
Run unit test suite for development.