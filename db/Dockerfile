FROM mongo:latest
RUN mkdir -p /data/logs \
    && chown -R mongodb:mongodb /data/logs
VOLUME /data/logs
CMD ["mongod", "--noauth", "--logpath", "/data/logs/mongo.logs"]