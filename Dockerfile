
# Usa uma imagem Node oficial
FROM node:20

# Define diretório de trabalho
WORKDIR /app

# Copia os arquivos de configuração
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia o restante do código
COPY . .

# Expõe a porta usada pelo Fastify
EXPOSE 4000

# Comando para iniciar a API
CMD ["npm", "run", "start:dev"]
