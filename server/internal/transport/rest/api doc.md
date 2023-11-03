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
    "assignee": {
      "id": 1,
      "name": "Rustam Davletkhanov"
    },
    "priority": {
      "id": 2,
      "name": "Normal"
    },
    "project": {
      "id": 2,
      "name": "Project 2"
    },
    "start_date": "2023-09-29",
    "status": {
      "id": 1,
      "name": "New",
      "is_closed": false
    },
    "subject": "p2 issue",
    "tracker": {
      "id": 1,
      "name": "Bug"
    }
  }
]
```