```
# docker-compose.yaml
version: "3"
services:
  app:
    image: "nginx:alpine"
    ports:
      - 8000:80

```