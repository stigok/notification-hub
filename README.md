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
```

Then retreive the latest notification again

```
$ curl -i 127.0.0.1:3000
```

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
