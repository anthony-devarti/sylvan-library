# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

---

#### Database Initial Work

Node does not yet have sha2_password usage implemented, so we will need to set the password type to `mysql_native_password` for now.
This setup will allow sylvan to use node.js to connect to the underlying MySQL server. I am planning to determine a SQLite equivalent process once the SQL portion is setup (this will allow for a full-scale and lightweight version). In the meantime, I will add a Dockerfile which can build out the MySQL client and pass it the credentials and setup drafted below.

```
CREATE USER 'sylvan'@'%' IDENTIFIED WITH mysql_native_password BY 'password';
CREATE DATABASE sylvandb;
GRANT ALL ON sylvandb.* TO sylvan;
FLUSH PRIVILEGES;
```

#### Docker Container Work

So far we have a Dockerfile that:
- Grabs the Debian:latest docker image
- Copies the sylvan-library codebase into the image
- Installs mysql, python3 and django
- Uses parts of the codebase to configure mysql
- Runs `npm install` within /var/www/sylvan-library

Right now, the docker container needs something to keep it alive when it is started from the image. Currently if we run the container without any stipulations it will immediately stop, because no processes are holding it in running status at the moment. The commands below are for testing the current build as we mess with it.

```
cd sylvan-library
docker build .
# Start the docker image as a container without auto-stopping (temporary)
docker run -dit (image-id)
# Access the container using the shell to peer into its guts
docker exec -it (image-id) /bin/bash
```

It is lacking an initializer script `CMD init` at the end, which will run the initial tasks for the container at startup. This will include a process that will keep it alive, most likely MySQL since we want that up as long as the container is in use.
In addition to starting the MySQL service, we should include a shell script at init to start the DB with a provided user/pass and any initial DB tables we may want to have for the app to access.

There is no web server setup to host the app in this Dockerfile, we could install something if that is needed, but for now this Dockerfile at least provides a rudimentary development/testing environment that can be run on anything with Docker installed.