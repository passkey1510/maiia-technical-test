FROM node:16

WORKDIR /opt/app
ENV NODE_ENV=production
COPY . .
RUN yarn && yarn build
CMD ["node", "packages/backend/dist/server"]
