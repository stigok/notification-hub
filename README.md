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
