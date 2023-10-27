# Документация API для Redmine

## Получение списка версий

### URL

**GET** `/get_redmine_versions`

### Параметры запроса

- `token` (обязательный): Токен аутентификации.

### Описание

Этот эндпоинт позволяет получить список всех версий проекта Redmine.

### Примеры запросов

#### Запрос

GET http://localhost:8080/get_redmine_versions?token=YOUR_TOKEN


#### Пример ответа

```json
[
  {
    "id": 5,
    "name": "target version"
  },
  {
    "id": 4,
    "name": "2.0"
  },
  {
    "id": 2,
    "name": "1.0.1"
  },
  {
    "id": 1,
    "name": "1.0"
  }
]
```

## Получение списка версий

### URL

**GET** `/get_redmine_issues`

### Параметры запроса

- `token` (обязательный): Токен аутентификации.
- `version` (обязательный): Название версии, для которой нужно получить список задач.

### Описание
Этот эндпоинт позволяет получить список задач для указанной версии проекта Redmine.

### Примеры запросов

#### Запрос

GET http://localhost:8080/get_redmine_issues?token=YOUR_TOKEN&version=VERSION


#### Пример ответа

```json
[
  {
    "Subject": "issue 1",
    "Status": {
	    "id": 1,
	    "name": "New",
	    "is_closed": false
  },
    "Priority": {
	    "id": 2,
	    "name": "Normal"
  },
    "Assignee": {
	    "id": 0,
	    "name": ""
  },
    "StartDate": "2023-09-29",
    "DueDate": null
  }
]
```