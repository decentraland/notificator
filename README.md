# Notificator server

This is a simple server that implements the validation logic required for
indexing a world into Places.

# Consuming the API

## Should index endpoint

This endpoint is used to validate whether a world should be indexed in Places or
not, according to the rules determined
in [this governance proposal](https://governance.decentraland.org/proposal/?id=e712bb50-e822-11ed-b8f1-75dbe089d333).

```http request
POST https://notificator.decentraland.org/should-index
Content-Type: application/json

{ "dclNames": ["some-name.dcl.eth", "another-name.dcl.eth", "yet-another-name.dcl.eth"] }

===

HTTP/1.1 200 OK
Date: Tue, 06 Jun 2023 15:13:11 GMT
Content-Type: application/json

{
  "data": [
    {
      "dclName": "some-name.dcl.eth",
      "shouldBeIndexed": true
    },
    {
      "dclName": "another-name.dcl.eth",
      "shouldBeIndexed": true
    },
    {
      "dclName": "yet-another-name.dcl.eth",
      "shouldBeIndexed": false
    }
  ]
}
```

# Running the server

## For development

For development purposes, just clone this repository, build the project and run:

```bash
git clone https://github.com/decentraland/notificator.git
yarn
yarn build
yarn start
```

There should be a server running on port 3000.

## For production

For running a production server, it is recommended to use the docker image
published by this repository. It is important to provide proper values for
LiveKit configuration using `--env` CLI options, as follows:

```bash
docker pull quay.io/decentraland/notificator
docker run --name notificator -p 3000:3000 quay.io/decentraland/notificator
```
