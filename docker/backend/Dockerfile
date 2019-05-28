FROM google/cloud-sdk:slim

# replace shell with bash so we can source files
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

# nvm environment variables
ENV NVM_DIR /usr/local/nvm
ENV NODE_VERSION 8.16.0


RUN mkdir -p $NVM_DIR

# install nvm
# https://github.com/creationix/nvm#install-script
RUN curl --silent -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash

# install node and npm
RUN source $NVM_DIR/nvm.sh &&\
    nvm install $NODE_VERSION &&\
    nvm alias default $NODE_VERSION &&\
    nvm use default

# add node and npm to path so the commands are available
ENV NODE_PATH $NVM_DIR/versions/node/v$NODE_VERSION/lib/node_modules
ENV PATH $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH

RUN pip install google-cloud-pubsub && \
    npm install -g node-pre-gyp

CMD tail -f /dev/null