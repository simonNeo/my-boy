project='my-boy-server'
port=3000

git pull

docker stop ${project}
docker rm ${project}
docker rmi ${project}
docker build -t ${project} .

docker run --name ${project} \
-e TZ=Asia/Shanghai \
-e NODE_ENV=production \
-e DB_MASTER_HOST=127.0.0.1 \
-e DB_MASTER_USER=root \
-e DB_MASTER_PWD=simonsakura \
-e MAIN_REDIS_HOST=127.0.0.1 \
-e MAIN_REDIS_PWD=simonsakura \
-p 3000:3000 \
-d ${project}

docker logs -f ${project}
