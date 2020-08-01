# Build layer
FROM ruby:2.5.1-stretch as build
ARG APP_ENV=prod

RUN mkdir -p /work
WORKDIR work
RUN gem install bundler
COPY Gemfile Gemfile
COPY Gemfile.lock Gemfile.lock
RUN bundle install
COPY . .
RUN mv _config-${APP_ENV}.yml _config.yml
RUN bundle exec jekyll build


FROM node:14.5.0-buster-slim as build2

WORKDIR /app
RUN npm -g install gatsby-cli && gatsby telemetry --disable
ADD ./v2/package.json ./package.json
ADD ./v2/package-lock.json ./pakcage-lock.json
RUN npm install --production --frozen-lockfile --non-interactive
ADD ./v2/. ./
RUN gatsby build --prefix-paths

# Hosting Layer
FROM nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build2 /app/public/ /usr/share/nginx/html2/
COPY --from=build /work/_site/ /usr/share/nginx/html/