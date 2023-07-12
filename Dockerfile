FROM node:20-alpine3.17 as builder

WORKDIR /app   
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

# Path: Dockerfile
FROM node:20-alpine3.17

WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 5000

CMD ["npm", "start"]