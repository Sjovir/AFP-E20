# Base image
FROM node:12.18.3-alpine3.12

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

# Install YARN dependencies. Use --only=production when in production
RUN yarn

COPY . .

CMD [ "yarn", "dev" ]
