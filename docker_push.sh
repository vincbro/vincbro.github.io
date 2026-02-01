PROJECT_NAME="vincbro.github.io"
DOCKER_IMAGE="vincbrod/vincbro.github.io"

echo "Pushing $PROJECT_NAME docker image..."
sudo docker push $DOCKER_IMAGE:latest
echo "$PROJECT_NAME docker image pushed"
