# Используйте официальный образ Node.js
FROM node:latest

# Установите рабочую директорию внутри контейнера
WORKDIR /app

# Скопируйте файлы package.json и package-lock.json и установите зависимости
COPY package*.json ./
RUN npm install

# Скопируйте все файлы из текущей директории в рабочую директорию
COPY . .

EXPOSE 3000

# Запустите приложение React
CMD ["npm", "run", "dev"]


