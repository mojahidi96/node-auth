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

For GET method
```sh
curl http://localhost:4202/register
```

For POST method
```sh
curl -H "Content-Type: application/json" -X POST http://localhost:4202/register -d "{\"email\":\"mojahidi96@gmail.com\",\"name\":\"Mojahid\",\"password\":\"secret@123\", \"passwordConfirmation\":\"secret@123\"}"

```
