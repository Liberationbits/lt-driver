#!/bin/sh

# precondition: an ssh setup for uberspace must be in place

npm install \
&& npm run build \
&& npm ci --omit dev \
rm build.tarx
rm node_modules.tarx
tar -cf build.tarx build/* \
&& tar -cf node_modules.tarx node_modules/* \
&& scp build.tarx uberspace:lt-driver \
&& scp node_modules.tarx uberspace:lt-driver \
&& scp package.json uberspace:lt-driver \
&& scp package-lock.json uberspace:lt-driver

