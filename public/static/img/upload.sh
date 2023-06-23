#!/bin/bash

# The directory containing the images
DIRECTORY="."

# The Cloudflare API endpoint
API_ENDPOINT="https://api.cloudflare.com/client/v4/accounts/81cd223371b823f805c79c72b300a7bc/images/v1"

# The authorization token
TOKEN=$(cat ~/.keys/cloudflare_images)

# Find all JPEG and PNG images in the directory and its subdirectories
find $DIRECTORY -type f \( -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" \) | while read IMAGE
do
ID=$(echo $IMAGE | cut -c 3-)
  # Check if the image file exists
  if [ -f "$IMAGE" ]; then
    echo "Uploading $IMAGE... with id $ID"
    curl -X POST -F "file=@$IMAGE" -H "Authorization: Bearer $TOKEN" -F "id=$ID" $API_ENDPOINT
  fi
done
