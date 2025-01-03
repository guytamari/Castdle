FROM node:18-alpine
WORKDIR /app
COPY Castdle/package*.json ./
RUN npm install
COPY Castdle/. .
EXPOSE 3000
CMD ["npm","start"]
