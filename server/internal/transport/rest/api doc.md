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

## Добавление/обновление информации о версии

### URL

**POST** `/set_version_info`

### Параметры запроса

- `version` (обязательный): Номер версии.
- `store` (обязательный): Название магазина приложений.
- `deployDate` (необязательный): Дата деплоя. (строка dd-mm-yyyy)
- `installPercentage` (необязательный): Процент раскатки. (число от 0 до 1)
- `isErrors` (необязательный): Есть ли ошибки. (строка true если есть, false если нет)

### Описание
Эндпоинт для добавления или изменения информации версии.

### Примеры запросов

#### Запрос

POST http://localhost:8080/set_version_info?version=1.0.1&store=Google%20Play&deployDate=12-02-2023&approvalDate=2023-12-02&installPercentage=0.8

#### Пример ответа

```json
{
"message": "Информация о версии успешно добавлена."
}
```

## Получение информации о версии

### URL

**GET** `/get_version_info`

### Параметры запроса

- `version` (обязательный): Номер версии.

### Описание
Эндпоинт для получения информации о версии. 


### Примеры запросов

#### Запрос

GET http://localhost:8080/get_version_info?version=1.0.0

#### Пример ответа

```json
[
  {
    "Version": "1.0.0", 
    "Store": "Google Play",
    "DeployDate": "12-02-2023",
    "InstallPercentage": 0.8, // число от 0 до 1
    "IsErrors": 0 // 0 - false; 1 - true
  },
  {
    "Version": "1.0.0",
    "Store": "AppStore",
    "DeployDate": "12-02-2023",
    "InstallPercentage": 0.8, // число от 0 до 1
    "IsErrors": 1 // 0 - false; 1 - true
  }
]
```