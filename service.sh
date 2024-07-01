#!/usr/bin/bash

case $1 in
'start')
  npm start
  echo $? >pid
  ;;
'stop')
  kill -9 "$(cat pid)"
  ;;
'restart')
  kill -9 "$(cat pid)"
  npm start
  echo $? >pid
  ;;
esac
