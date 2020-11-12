# Base image
FROM node:14.15.0-alpine3.12 as builder

WORKDIR /usr/app

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

# Install YARN dependencies. Use --only=production when in production
RUN yarn

COPY . .

# RUN [ "yarn", "tsc" ]


# Lint the code
FROM node:14.15.0-alpine3.12 as linting
WORKDIR /usr/app
COPY --from=builder /usr/app/ .
RUN [ "yarn", "eslint" ]


# Test the code
FROM node:14.15.0-alpine3.12 as test
WORKDIR /usr/app
COPY --from=builder /usr/app/ .
RUN [ "yarn", "test" ]


# Starts the server
FROM node:14.15.0-alpine3.12 as serve
WORKDIR /usr/app
# ENV SERVER-FILE index.js
# COPY --from=builder /usr/app/dist .
COPY --from=builder /usr/app/ .
CMD [ "yarn", "dev" ]
