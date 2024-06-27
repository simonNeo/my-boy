project='faya-course-server'
port=8090

git checkout dev
git pull
cnpm i

npm run build

podman stop ${project}
podman rm ${project}
podman rmi ${project}
podman build -t ${project} -f ./scripts/docker/demo.Dockerfile .
podman run -d --env NODE_ENV=development --name ${project} -p ${port}:3001 ${project}
podman logs -f ${project}
