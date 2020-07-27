FROM node:14.5.0-buster-slim as build

WORKDIR /app
RUN npm -g install gatsby-cli && gatsby telemetry --disable
ADD package.json package-lock.json ./
RUN npm install --production --frozen-lockfile --non-interactive

ADD . ./
RUN gatsby build --prefix-paths


FROM gatsbyjs/gatsby:latest
COPY --from=build /app/public /pub