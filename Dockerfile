# Usa una imagen base oficial de Node.js
FROM node:18-alpine

# Crea y define el directorio de trabajo
WORKDIR /usr/src/app

# Copia los archivos de definición de paquetes e instala las dependencias
COPY package*.json ./
RUN npm install

# Copia el resto del código de la app
COPY . .

# Expone el puerto en el que corre la app
EXPOSE 3000

# El comando para iniciar la app
CMD [ "npm", "start" ]