# Getting Started with Create React App

This is a MERN project made with MongoDB, Express, React and Node.js.
It is a language learning application whose purpose is to help with expanding ones is
vocabulary through playing games. Right now the only option is about
learning japanese through english but I plan on continuing to work on this application
in my spare time for quite some time.

This is my frontend folder. It is set up with React, React Router and SCSS.
Starting with the index.js file. It is wrapped in my AuthContextProvider
that passes the user state to all components where it is needed.

In my App.js I have set up the routing with React Router. There I have all of my pages.

In the components folder all components are reusable and used multiple times throughout
my application.

DragAndDrop, Sudoku and WordSearch are the three types of games that I currently have.'
Each of them is used in at least two games. Each game has a different page, where all the
specific information for that game gets passed to one of the previously mentioned components.
There are currently 19 games in the application but I continue to add new ones regularly.

On to the signup and login pages and the authorisation handling. When a user is not logged in
the app they are still able to play the games but they would get notified, that their
results won't be saved unless they are a registered user. Upon signing up, a document for
each of the games containing this exact user is id is created. For that point onwards this
user is playthrough information would be stored inside the database.
All the users is information is protected with jsonwebtoken. For the signup validation
I am using validator and for the password is encryption I am using bcrypt but that is in
the backend.

The game document stores the information about the game is name, the best score achieved,
whether the game has been completed (which changes the color of the link to this game
to indicate that it has been completed), the playthrough information,
where the information about the time spend playing,
the score achieved and on which playthrough are stored.

Inside each of the components and hooks and pages there is a lot that can be explained,
and I am not sure if mentioning all of it on this .txt file makes sense. So please tell
me if you need any part of the code explained and I will gladly do so.

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
