FROM node:20-alpine

# Install system dependencies for node-gyp and ts-node
RUN apk add --no-cache bash python3 make g++ 

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy all files including .ts for runtime usage
COPY . .

RUN chmod +x ./wait-for-it.sh
# Optional: build app (but we'll still run from ts-node if needed)
RUN npm run build


EXPOSE 8080

# ✅ Use your current script
CMD ./wait-for-it.sh mysql 3306 -- sh -c  "npm run typeorm:run && npm run seed && npm test && npm run start:dev"
