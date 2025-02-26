# To Update
## Routes
1. `/route1`: Returns 200 after 10 sec process delay
2. `/route2`: Returns 500 after 10 sec process delay
3. `/route3`: Internally calls route1 but the api is interrupted in 5 sec, returns 500
4. `/route4`: Internally calls route1 but the api is interrupted in 5 sec, empty response, simulates network error
5. `/route5`: Internally calls route1 but the api is interrupted in 5 sec, 408 response from app stating timeout from app

Can use below cronjob to call different endpoint and check the behaviour

cronjob file
```job.yaml
apiVersion: batch/v1
kind: CronJob
metadata:
  name: call-route1-cronjob
spec:
  schedule: "*/5 * * * *"  # Runs every 5 minutes, you can modify this as needed
  jobTemplate:
    spec:
      suspend: true
      template:
        spec:
          containers:
          - name: curl-container
            image: curlimages/curl:latest  # Using a lightweight Curl container
            command:
            - /bin/sh
            - -c
            - |
              # Use curl to call the route1 of the Express app
              curl -vv -X GET http://express-app-service/route4  # Replace with your Express service name
          restartPolicy: Never  # Restart the container on failure  
```

Below are the commands to setup the deployment and cronjob


Deployment exec: `k create deploy express-app --image dhruvbhartia07/express-app-test-route:v1`

Service create: `k expose deploy express-app --port 80 --target-port 3000 --name express-app-sevice`

Create cronjob: `k apply -f job.yaml` #job.yalm is the above cronjob file

create a job: ` create job job1 --from cronjob/call-route1-cronjob`
