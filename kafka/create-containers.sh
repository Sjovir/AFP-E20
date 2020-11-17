#!/bin/bash

docker network create apache-net --driver bridge

docker run --name zookeeper-server -p 2181:2181 --network apache-net -e ALLOW_ANONYMOUS_LOGIN=yes -d bitnami/zookeeper:latest

docker run --name kafka-server1 -p 9092:9092 --network apache-net \
-e ALLOW_PLAINTEXT_LISTENER=yes \
-e KAFKA_CFG_ZOOKEEPER_CONNECT=zookeeper-server:2181 \
-e KAFKA_CFG_ADVERTISED_LISTENERS=PLAINTEXT://localhost:9092 \
-d bitnami/kafka:latest