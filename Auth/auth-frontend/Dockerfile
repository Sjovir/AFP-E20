#######################
## STEP 1 Base image ##
#######################
FROM node:12.18.3-alpine3.12 as builder
# FROM node:12.18.3-alpine3.12

# Working directory in base container
WORKDIR /app

# The dependencies to the project
COPY package.json .
COPY yarn.lock .

# The version of YARN to install
ENV YARN-VERSION 1.22.5

# Add curl
RUN apk --no-cache add curl

# Install YARN
RUN curl -fSLO --compressed "https://yarnpkg.com/downloads/$YARN_VERSION/yarn-v$YARN_VERSION.tar.gz" \
    && tar -xzf yarn-v$YARN_VERSION.tar.gz -C /opt/ \
    && ln -snf /opt/yarn-v$YARN_VERSION/bin/yarn /usr/local/bin/yarn \
    && ln -snf /opt/yarn-v$YARN_VERSION/bin/yarnpkg /usr/local/bin/yarnpkg \
    && rm yarn-v$YARN_VERSION.tar.gz

# Install dependencies
RUN yarn

# Copy the application
COPY . .

# Build the application
RUN yarn run build --prod

#############################
## STEP 2 Production image ##
#############################
FROM nginx:1.19.2-alpine

# Configuration for nginx
COPY --from=builder /app/nginx.conf /etc/nginx/nginx.conf

# Copy app to nginx
COPY --from=builder /app/dist/auth-frontend /usr/share/nginx/html

# Run container in foreground to prevent docker from shutting it down immediately
# CMD ["nginx", "-g", "daemon off;"]
