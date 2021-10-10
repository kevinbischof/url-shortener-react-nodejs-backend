# URL-Shortener in React with Node.js backend
This is the backend for the url shortener written with node.js in TypeScript.

# Start Server
To start the server execute `npm start`

## Example backend URL's
You can execute the request with the example http request files in the `http` folder. 

VS Code users need to install a plugin like [httpYac - Rest Client](https://marketplace.visualstudio.com/items?itemName=anweber.vscode-httpyac).

### Find one
GET http://localhost:3000/urls/:id

Return:
```json
{
  "data": {
    "id": 1,
    "url": "http://www.heise.de/",
    "short": "fpwB",
    "hitCount": 2
  }
}
```

A call to find one will automatically increase the `hitCount` by 1

### Find all
GET http://localhost:3000/urls/

### Create
POST http://localhost:3000/urls/

```json
{
  "url": "http://www.heise.de/"
}
```

Return:
```json
{
  "data": {
    "id": 1,
    "url": "http://www.heise.de/",
    "short": "fpwB",
    "hitCount": 0
  }
}
```

The backend will automatically create a short url with numbers and letters.

### Update

PUT http://localhost:3000/urls/:id

```json
{
  "id": 1,
  "hitCount": 1337
}
```

Return:
```json
{
  "data": {
    "id": 1,
    "url": "http://www.heise.de/",
    "short": "fpwB",
    "hitCount": 1337
  }
}
```

## References 
https://livecodestream.dev/post/your-guide-to-building-a-nodejs-typescript-rest-api-with-mysql/