# Test Deploy
Repository is linked to build pipeline.
The last step of this pipeline is to deploy the state of the master-branch to the development server.
There it can be fully tested with all other resources.

The pipeline is automatically triggered on commit to master branch.

# Production Deploy
To deploy this application for production, run following commands.
1. gradlew build
2. docker build . -t cide/rooms-server:<version>
3. docker login
4. docker push  cide/rooms-server:<version>

After this, go to production server, shutdown system, remove old image, restart compose.
