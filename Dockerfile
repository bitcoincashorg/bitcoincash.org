# Build layer
FROM ruby:2.5.1-stretch
ENV DEBIAN_FRONTEND=noninteractive

RUN mkdir -p /work
WORKDIR work
RUN gem install bundler
COPY . .
RUN bundler install
RUN bundler exec rake translations:build
RUN bundler exec rake spec
RUN bundler exec rake workgroups

# Hosting Layer
FROM nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=0 /work/html/ /usr/share/nginx/html/
COPY --from=0 /work/workgroups/_site/ /usr/share/nginx/html/workgroups
COPY --from=0 /work/spec/_site/ /usr/share/nginx/html/spec