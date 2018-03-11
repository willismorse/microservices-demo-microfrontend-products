This code provides a microfrontend for the Sock Shop microservices demo project. 


# Commands
```
docker build -t 'willismorse/microservices-demo-microfrontend-products:latest' .
docker push willismorse/microservices-demo-microfrontend-products:latest

helm package microservices-demo-microfrontend-products-chart
helm repo index . 
```

# Telepresence
```
cd <project-folder>
telepresence --swap-deployment products --expose 8080 --run yarn start
```
