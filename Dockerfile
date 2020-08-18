# Optionally build v2 layer
FROM node:14.8.0-buster-slim as buildv2
ARG APP_VERSION=1
WORKDIR /work

# Ensure the public dir exists for v1 builds
RUN mkdir -p public

RUN if [ "${APP_VERSION}" -eq "2" ]; then npm -g install gatsby-cli ; fi
COPY v2/package.json v2/package-lock.json ./
RUN if [ "${APP_VERSION}" -eq "2" ]; then npm install --frozen-lockfile --non-interactive ; fi
COPY v2 .
RUN if [ "${APP_VERSION}" -eq "2" ]; then npm run build ; fi

# Build v1 layer
FROM ruby:2.5.1-stretch as buildv1
ARG APP_ENV=prod

WORKDIR /work
RUN gem install bundler
COPY Gemfile Gemfile
COPY Gemfile.lock Gemfile.lock
RUN bundle install
COPY . .
RUN mv _config-${APP_ENV}.yml _config.yml
RUN bundle exec jekyll build

# Hosting Layer
FROM nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=buildv1 /work/_site/ /usr/share/nginx/html/
COPY --from=buildv2 /work/public/ /usr/share/nginx/htmlv2/
