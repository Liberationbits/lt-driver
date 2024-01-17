#!/bin/sh

# Preconditions:
# - the script build-transfer.sh was succesfully executed in the project root
# - this script is to be executed in uberspace directory lt-driver

rm -r build && rm -r node_modules \
&& tar -xf node_modules.tarx \
&& rm node_modules.tarx \
&& tar -xf build.tarx \
&& rm build.tarx \
&& supervisorctl restart lt-driver-daemon
