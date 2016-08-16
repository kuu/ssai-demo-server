# ssai-demo-server
A web server for demonstrating Ooyala Live Platform's Server Side Ad Insertion (SSAI) feature.

## Install
Requires Node.js (version 6+)
```
$ git clone git@github.com:kuu/ssai-demo-server.git
$ cd ssai-demo-server
$ npm install
```

## Configure
```
$ mkdir config
$ touch config/default.json
```
Edit `config/default.json` as follows:
```
{
  "api": {
    "key": {Your Ooyala API Key},
    "secret": {Your Ooyala API Secret}
  }
}
```

## Build + Run (development)
```
$ npm run watch
```
It will open up your browser and connect to localhost:9000

## Build + Run (production)
```
$ npm run build && npm start
```
A server will start on port 3000
