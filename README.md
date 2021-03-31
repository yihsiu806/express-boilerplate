# Express Boilerplate

```
npm install
```

```
node server.js
```

## Basic Route

```
curl -v http://localhost:3000/user
```

```
curl -v -X POST http://localhost:3000/user --data "user=yihsiu"
```

```
curl -v -X PUT http://localhost:3000/user --data "user=yihsiu"
```

```
curl -v -X DELTET http://localhost:3000/user --data "user=yihsiu"
```

```
curl -v http://localhost:3000/butterfly
curl -v http://localhost:3000/dragonfly
```

## Serve Static File
```
curl -v http://localhost:3000/image-1.jpg
curl -v http://localhost:3000/public/image-1.jpg
curl -v http://localhost:3000/static/image-1.jpg
```

## Route Parameter
```
curl -v http://localhost:3000/users/1/books/1
curl -v http://localhost:3000/users/1/books/2
curl -v http://localhost:3000/users/13/books/13
```

## Multiple Handlers
```
curl -v http://localhost:3000/example/c
```

## app.route()
```
curl -v http://localhost:3000/book
curl -v -X POST http://localhost:3000/book
curl -v -X PUT http://localhost:3000/book
```

## express Router
```
curl -v http://localhost:3000/api
curl -v http://localhost:3000/api/name
```
