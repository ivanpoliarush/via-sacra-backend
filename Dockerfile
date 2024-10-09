FROM node:22-alpine
WORKDIR /
ADD package.json package.json
RUN npm install --force
ADD . .
RUN npm run build
RUN npm prune --production --force
CMD [ "node", "./dist/main.js" ]
