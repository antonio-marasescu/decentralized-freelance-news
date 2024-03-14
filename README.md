# Decentralized Freelance News
The master's thesis application which is centered on creating an open news platform that ensures the verifiability of writers' identities using Zero-Knowledge Proofs.

## IPFS

### Running locally with Docker

1. Have the Docker container of IPFS started
2. Run `docker exec -ti <ipfs_container_name> sh`
3. Inside the container terminal run
   - `ipfs config Addresses.Gateway /ip4/0.0.0.0/tcp/8080`
   - `ipfs config Addresses.API /ip4/0.0.0.0/tcp/5001`
   - `ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin "[\"*\"]"`
   - `ipfs config --json API.HTTPHeaders.Access-Control-Allow-Credentials "[\"true\"]"`
4. Exit using `exit`
5. Restart container using `docker restart <ipfs_container_name>`


**Note:** Alternatively you can use the [WebUI](http://0.0.0.0:5001/webUI) provided by the IPFS container to change the configuration.
