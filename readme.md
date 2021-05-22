# node-auth

### Create new file using command
```sh
type nul > your_file.txt
```

### Generate ```tsconfig.json``` file
```sh
npx tsc --init
```

### Build ```tsconfig.json``` file
```sh
npx tsc
```

## curl

#### For GET method
```sh
curl http://localhost:4202/register
```

#### For POST method
 /register
```sh
curl -H "Content-Type: application/json" -v -X POST http://localhost:4202/register -d "{\"email\":\"mojahidi96@gmail.com\",\"name\":\"Mojahid\",\"password\":\"Secret123\", \"passwordConfirmation\":\"Secret123\"}"

```

/login
```sh
curl -H "Content-Type: application/json" -v -X POST http://localhost:4202/login -d "{\"email\":\"mojahidi96@gmail.com\",\"password\":\"Secret123\"}"

```

## References
https://medium.com/hackernoon/your-node-js-authentication-tutorial-is-wrong-f1a3bf831a46

https://github.com/alex996/node-auth
