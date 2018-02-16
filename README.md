# serverless-isomorphic-react-boilerplate

Serverless Framework boilerplate with React server-side rendering.

# Getting started

## Install service & dependencies

```
sls install -u https://github.com/artoliukkonen/serverless-isomorphic-react-boilerplate
cd serverless-isomorphic-react-boilerplate
yarn
```

## Next steps

* Edit `serverless.yml` `service` to something unique
* Edit `package.json` and name S3 bucket to same as your `service` plus `-assets` postfix
* Run `yarn start`


## Development

### Option 1 - React through webpack-dev-server

This option allowes you to bypass server-side rendering and develop client using HMR. 

Start devserver by running
```
yarn start
```

### Option 2 - Run Serverless locally

This options allowes you to test server-side rendering offline. 


First run client bundler in watch mode
```
yarn dev
```

Then in another terminal window, launch serverless-offline

```
yarn offline
```


## Production

Run `yarn deploy` to deploy production version to AWS. 


## TODOs

* Fix `TODO`s from code
* Separate API & webapp in different projects
* Describe how to setup CloudFront distribution