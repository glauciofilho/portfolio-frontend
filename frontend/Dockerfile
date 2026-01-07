# =========================
# 1️⃣ Build da aplicação
# =========================
FROM node:20-alpine AS build

WORKDIR /app

# Copia apenas dependências primeiro (cache eficiente)
COPY package.json package-lock.json ./

RUN npm ci

# Copia o restante do projeto
COPY . .

# Build de produção
RUN npm run build

# =========================
# 2️⃣ Servir com Nginx
# =========================
FROM nginx:alpine

# Remove config padrão
RUN rm /etc/nginx/conf.d/default.conf

# Copia configuração customizada
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia build do React
COPY --from=build /app/dist /usr/share/nginx/html

# Expõe porta 80
EXPOSE 88

# Inicia Nginx
CMD ["nginx", "-g", "daemon off;"]