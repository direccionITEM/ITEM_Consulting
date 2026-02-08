#!/bin/bash
# Build script for Vercel
node ./node_modules/typescript/bin/tsc --noEmit
vite build
