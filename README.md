This is a react quickstart which will have you deploying a fully working react app in minutes using Hasura. Moreover, the included react app also utilizes the various backend components of Hasura to implement features like:
- Authentication
- Storing and retrieving data from a database
- Uploading and downloading files

Follow along with the tutorial to learn how everything works to make the most out of Hasura.

## What does this come with?

* A working React.js Hello World Project
  * Automatic reloading and bundling
  * All *create-react-app* feature
  * react-scripts with inbuilt webpack bundling
* Deployed with the [**serve**](https://www.npmjs.com/package/serve) package
* **Dockerfile** (automatically used by Hasura for deployment)

```
FROM node:8

RUN apt-get update && apt-get install -y build-essential python

#Install deps
RUN mkdir /app
COPY app/package.json /app/package.json
RUN cd /app && npm install
RUN npm -g install serve

#Add all source code
ADD app /app/
RUN cd /app && npm run build

WORKDIR /app

#Default command
CMD ["serve", "-s", "build", "-p", "8080"]
```
* A simple Nodejs Express server

## Deployment instructions

Before you continue:

- Ensure that you have the HasuraCLI installed on your machine before you continue. If not, you can find instructions to install it [here](https://docs.hasura.io/0.15/manual/install-hasura-cli.html).
- Log into Hasura by running `$ hasura login` on your command shell.

### Basic deployment:

Run the following commands on your command shell to deploy the app:

```bash
$ hasura quickstart hasura/hello-react
$ cd hello-react
$ git add . && git commit -m "Initial Commit"
$ git push hasura master
```

* The `hasura quickstart` command clones the project repository to your local computer, and also creates a **free Hasura cluster**, where the project will be hosted for free.
* A git remote (called hasura) is created and initialized with your project directory.
* `git push hasura master` deploys this project on the cluster that was created in the first step.

### Open the react app in the browser

* Run the below command to open your shiny new deployed react app.

``` shell
$ hasura microservice open ui
```

### Code Structure

The contents inside the `hello-react` directory are what constitutes a `Hasura Project`. A `Hasura Project` is designed in such a way that all the configurations to your cluster as well the source code for your app resides within the `Hasura Project`. This simple design brings in the advantage of having everything you do under version control and helps with easy collaboration with other developers.

The source code for the `react` app can be found inside the `microservices/ui/app` directory.

>Everything that you deploy on Hasura is a "microservice". You can read more about microservices [here](https://docs.hasura.io/0.15/manual/microservices/index.html)

#### Making changes and deploying

* To make changes to the project, browse to `/microservices/ui/app/src` and edit the `HasuraExampleApp.js` file in `hasuraExamples` folder according to your app.
* Commit the changes, and perform `git push hasura master` to deploy the changes.

### Local development

To test and make changes to this app locally, follow the below instructions.
* Open Terminal and `cd` into `microservices/ui/app`
* Run `npm install` to install all the project dependencies
* Run `npm start` and `npm build` in the terminal to build and run it.
* Make changes to the app, and see the changes in the browser

### View server logs

You can view the logs emitted by the ‘serve’ package by running the below command:

``` shell
$ hasura microservice logs ui
```
You can see the logs in your terminal, press `CTRL + C` to stop logging.

### Managing app dependencies

* System dependencies, like changing the web-server can be made in the Dockerfile
* npm/yarn deps can be managed by editing **package.json**.

If changes have been done to the dependencies, `git commit`, and perform `git push hasura master` to deploy the changes.

### Migrating your existing React.js app

* If you have an existing react app which you would like to deploy, replace the code inside `/microservices/ui/src/` according to your app.
* You may need to modify the Dockerfile if your `package.json` or the build directory location has changed, but in most cases, it won't be required.
* Commit, and run `git push hasura master` to deploy your app.

#### Understanding the Dockerfile

Understanding what the Dockerfile does will help you modify it based on your requirement.

```
# Step 1: Pulls a simple ubuntu image with node 8 installed in it
FROM node:8

# Step 2: Install dependent software packages using apt-get
RUN apt-get update && apt-get install -y build-essential python

# Step 3: Make a new directory called "app"
RUN mkdir /app

# Step 4: Copy the package.json file from your local directory and paste it inside the container, inside the app directory
COPY app/package.json /app/package.json

# Step 5: cd into the app directory and run npm install to install application dependencies
RUN cd /app && npm install

# Step 6: Install server globally
RUN npm -g install serve

# Step 7: Add all source code into the app directory from your local app directory
ADD app /app/

# Step 8: cd into the app directory and execute the npm run build command
RUN cd /app && npm run build

# Step 9: Set app as our current work directory
WORKDIR /app

# Step 10: Serve the app at port 8080 using the serve package
CMD ["serve", "-s", "build", "-p", "8080"]
```

## Adding backend features

Hasura comes with BaaS APIs to make it easy to add backend features to your apps.

### Add instant authentication via Hasura’s web UI kit

Every project comes with an Authentication kit, you can restrict the access to your app to specific user roles.
It comes with a UI for Signup and Login pages out of the box, which takes care of user registration and signing in.

![Auth UI](https://docs.hasura.io/0.15/_images/uikit-dark.png)

Navigate to the `/authkit` path of the react app to see the Auth UI Kit in action.

>You can read more about the AUTH UI Kit [here](https://docs.hasura.io/0.15/manual/users/uikit.html).

This particular example shows a Username/password based authentication. Hasura also provides other authentication providers like Email/password, mobile/otp, google, facebook etc. You can learn more about authentication and the various providers [here](https://docs.hasura.io/0.15/manual/auth/index.html).

>You can also implement your own UI for authentication and just consume the authentication endpoints given by Hasura. 

### API console

The API Console is a web UI to help you manage and explore the various backend components provided by Hasura.

#### Run this command inside the project directory

```bash
$ hasura api-console
```

This will automatically open the API Console on your browser.

#### The API Explorer

What you see in the picture below is the `API Explorer`, this is where you can try out and experiment with the APIs of the various backend features. Explore the panel on the left to try out the different APIs.

&nbsp;
![api-explorer.png](https://filestore.hasura.io/v1/file/463f07f7-299d-455e-a6f8-ff2599ca8402)
&nbsp;

#### The Code Generator

Another nifty feature of the `API Explorer` is the `API Code Generator`. For every request that you try out on the `API Explorer`, you can generate working code in a variety of languages.

Let's take a look at an example:

**First**, let's try out the `signup` endpoint under `Username-Password`

&nbsp;
 ![API Explorer CodeGenButton](https://filestore.hasura.io/v1/file/0374dde1-ddd8-40e4-8d62-1d8a3f10dc44)
&nbsp;

Choose the username and password that you would like to signup with and click on `Send`.

**Second**, now that we have tried out the API, we want to implement this API in our react app. To do that, click on the `Generate API Code` button on the top right. In the pop up that comes up, choose `Javascript Fetch` from the list on the left.

&nbsp;
 ![API Explorer CodeGen](https://filestore.hasura.io/v1/file/ad733031-42b8-453c-afa9-c75ddfa8a864)
&nbsp;

This will print out the code to make this API in `Javascript` using the `Fetch` library.


### Add a custom API

Hasura project is composed of a set of microservices. These include certain Hasura microservices like, postgres, nginx, data API, auth API and more but can also include your own microservices.
This quickstart comes with one such custom service written in `nodejs` using the `express` framework. Check it out in action at `https://api.cluster-name.hasura-app.io` . Currently, it just returns a "Hello-React" at that endpoint.

* [Adding Microservice](https://docs.hasura.io/0.15/manual/custom-microservices/index.html)

### Add data APIs

Hasura comes with set of Data APIs to access the Postgres database which comes bundled with every Hasura cluster.
Detailed docs of data APIs can be found [here](https://docs.hasura.io/0.15/manual/data/index.html).
