# To Update
cronjob file
```yaml
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

Deployment exec: `k create deploy express-app --image dhruvbhartia07/express-app-test-route:v1`
Service create: `k expose deploy express-app --port 80 --target-port 3000 --name express-app-sevice`
create a job: ` create job job1 --from cronjob/call-route1-cronjob`
