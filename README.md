# Postgres Learning

This is just a simple NodeJS Express Server that connects to local Postgres Database for me to learn. This is essentially a basic Todo API that will progress to something more as I learn more.


## API Reference

### Get all Todos

```http
  GET /api/todo/getAllTodos
```

Fetches all Todos

### Get single todo

```http
  GET /api/todo/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `todo_id`      | `string` | **Required**. Id of a todo to fetch |

Get single todo by id

### Update a todo

```http
  PUT /api/todo/updateTodo/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `todo_id`      | `string` | **Required**. Id of a todo to update |
| `description`| `string` | Description of todo |

Update a todo by id

### Create a todo

```http
  POST /api/todo/createTodo
```

Create a todo

### Delete a todo

```http
  PUT /api/todo/deleteTodo/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `todo_id`     | `string` | **Required**. Id of the todo to remove |

remove a todo by id