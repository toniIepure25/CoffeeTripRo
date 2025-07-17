FROM node:18-alpine
WORKDIR / 
COPY package*.json ./
RUN npm install --production
COPY . ./
ENV NODE_ENV=production
CMD ["npm", "start"]