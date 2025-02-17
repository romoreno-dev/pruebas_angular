# Etapa 1: Construcción de Angular
FROM node:18 AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm run build --prod

# Etapa 2: Servidor Nginx
FROM nginx:alpine

COPY --from=build /app/dist/pruebas_angular/browser/ /usr/share/nginx/html/
#COPY /dist/pruebas_angular/browser /usr/share/nginx/html

# Copiar configuración personalizada de Nginx (opcional)
#COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
