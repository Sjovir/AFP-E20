#######################
## STEP 1 Base image ##
#######################
FROM node:14.15.0-alpine3.12 as builder

# Working directory in base container
WORKDIR /app

# The dependencies to the project
COPY package.json yarn.lock* ./

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

# Get mode from docker-compose
ARG MODE
RUN echo "MODE: $MODE"

# Build the application
RUN yarn run build-$MODE

#############################
## STEP 2 Production image ##
#############################
FROM nginx:1.19.2-alpine

# Configuration for nginx
COPY --from=builder /app/nginx.conf /etc/nginx/nginx.conf

# Copy app to nginx
COPY --from=builder /app/dist/medicine-frontend /usr/share/nginx/html
