PROJECT_NAME="vincbro.github.io"
DOCKER_IMAGE="vincbrod/vincbro.github.io"

echo "Building $PROJECT_NAME docker image..."
docker buildx build --platform linux/amd64,linux/arm64 -t $DOCKER_IMAGE:latest --push .
echo "$PROJECT_NAME docker image done"
