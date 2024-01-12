#!/bin/sh

rm -r build && rm -r node_modules \
&& tar -xf node_modules.tarx \
&& rm node_modules.tarx \
&& tar -xf build.tarx \
&& rm build.tarx \
&& supervisorctl restart lt-driver-daemon
