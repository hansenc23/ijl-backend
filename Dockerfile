FROM node:22-alpine

WORKDIR /usr/src/app

# Copy only necessary files for installation
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

COPY . .

# Build the application
RUN yarn build

EXPOSE 8000

# Start the server
CMD ["sh", "-c", "if [ \"$NODE_ENV\" = \"production\" ]; then yarn start:prod; else yarn start:dev; fi"]