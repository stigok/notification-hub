# notification-hub

Tiny HTTP API to store JSON objects non-persistently in memory.

See examples folder for more information about how I use this to
send my laptop notifications from my IRC session in irssi, using
`libnotify`, `curl`, and this server.

## Install and run

Install dependencies

```
$ npm install
```

Set environment and start server

```
$ ADDRESS=127.0.0.1 PORT=3000 npm start
```

Test the server endpoint

```
$ curl -i 127.0.0.1:3000 -X POST -d '{"title":"hello","message":"what is up??"}' -H 'Content-Type: application/json'
HTTP/1.1 201 Created
Date: Thu, 30 May 2019 12:12:43 GMT
Connection: keep-alive
Content-Length: 0
```

Then retreive the latest notification again

```
$ curl -i 127.0.0.1:3000
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Content-Length: 76
Date: Thu, 30 May 2019 12:12:45 GMT
Connection: keep-alive

{"title":"hello","message":"what is up??","date":"2019-05-30T12:12:43.933Z"}
```

Upon the next request now, there should be no more notifications

```
$ curl -i 127.0.0.1:3000
HTTP/1.1 204 No Content
Date: Thu, 30 May 2019 12:13:49 GMT
Connection: keep-alive
```

Get some extra log output with `DEBUG=1`

## API

### `POST` /
- Accepts `application/json` bodies.
- Expects a JSON body with a `message` and optionally a `title`.
- Returns `201` on success, `400` on invalid body, `500` on server errors

### `GET` /
If a notification exists
- Returns `200` with a JSON object of type `application/json`

If not
- Returns `204` with no content
