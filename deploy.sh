docker build -t renaldekoker/pigeon_customer_frontend:latest -t renaldekoker/pigeon_customer_frontend:$SHA -f ./pigeon-frontend/Dockerfile ./pigeon-frontend
docker build -t renaldekoker/pigeon_customer_api:latest -t renaldekoker/pigeon_customer_api:$SHA -f ./pigeon-api/Dockerfile ./pigeon-api

docker push renaldekoker/pigeon_customer_frontend:latest
docker push renaldekoker/pigeon_customer_frontend:$SHA

docker push renaldekoker/pigeon_customer_api:latest
docker push renaldekoker/pigeon_customer_api:$SHA

kubectl apply -f k8s
kubectl set image deployments/customer-frontend-deployment pigeon-frontend=renaldekoker/pigeon_customer_frontend:$SHA
kubectl set image deployments/customer-api-deployment pigeon-api=renaldekoker/pigeon_customer_api:$SHA