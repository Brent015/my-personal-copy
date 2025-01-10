#!/bin/bash

cd schemas
for file in *.js; do
    mv "$file" "${file%.js}.ts"
done