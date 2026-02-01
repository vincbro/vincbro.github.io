PROJECT_NAME="vincbro.github.io"
DOCKER_IMAGE="vincbrod/vincbro.github.io"

echo "Building $PROJECT_NAME docker image..."
sudo docker build -t $DOCKER_IMAGE:latest .
echo "$PROJECT_NAME docker image done"
