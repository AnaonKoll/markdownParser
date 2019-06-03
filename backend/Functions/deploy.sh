#!/bin/bash -e
echo "Deployment script to GCP"

zip -r functions.zip * -x "./node_modules/*" "deploy.sh" "./views/*"
gsutil cp functions.zip gs://bucket-markdown-parser
gsutil cp views/template.html gs://bucket-markdown-parser
gcloud functions deploy markdown-parser --runtime=nodejs8 --trigger-http --source=gs://bucket-markdown-parser/functions.zip --region=europe-west1 --project=markdown-parser-242020 --entry-point=parser

echo "Functions deployed"