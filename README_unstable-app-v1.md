## Unstable App
- This image is of an unstable nodejs app
- The image can break at runtime suddenly or when accessing the endpoint

### Usage:

- Run below command to run the container
```
docker run -p 3000:3000 dhruvbhartia07/unstable-app:v1
```

- Then try curl
```
curl localhost:3000
```
