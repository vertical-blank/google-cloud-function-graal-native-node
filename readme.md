
# google cloud function graal native node

Call function in shared library built with graalvm native-image from google cloud function.

## deploy

```bash
gcloud functions deploy hello-graal-native-node --runtime nodejs8 --entry-point handler --trigger-http
```
