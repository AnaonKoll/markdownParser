#!/bin/bash -e
echo "Deployment script to GCP"

zip -r functions.zip * -x "./node_modules/*" "deploy.sh" "./views/*"
gsutil cp functions.zip gs://markdown-parser-bucket
gsutil cp views/template.html gs://markdown-parser-bucket
gcloud functions deploy markdown-parser --runtime=nodejs8 --trigger-http --source=gs://markdown-parser-bucket/functions.zip --region=europe-west1 --project=markdown-parser-242020 --entry-point=parser

echo "Functions deployed"