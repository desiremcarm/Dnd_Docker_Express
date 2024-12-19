# Usa una imagen base de Node.js
FROM node:20

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos package.json y package-lock.json (si existe)
COPY package.json ./

# Copia todo el resto de los archivos de tu proyecto
COPY . .

# Instala las dependencias de npm
RUN npm i

# Exponer el puerto en el que se ejecutará la aplicación
EXPOSE 3001

# Comando para iniciar la aplicación
CMD ["npm", "start"]
