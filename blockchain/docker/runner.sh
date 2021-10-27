#!/bin/bash

docker run -dt \
    --name rust-builder \
    -p 9930-9960:9930-9960 \
    -p 30330-30350:30330-30350 \
    -v /Volumes/WORK/work/progress/210913_catena_peter/source/blockchain/node:/work \
    rustbuilder
