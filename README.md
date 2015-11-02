# Focus
Ghost Theme

## Development

- Download and unzip ghost from https://ghost.org/download/
- cd into the ghost directory and run the following:
  - `npm install --production`
  - `npm start`
- Open http://localhost:2368/ghost and setup your blog
- In a new terminal session, cd into your ghost folder then go to content/themes/
- Clone the repository `git clone https://github.com/joeldrapper/focus.git`
- cd into the focus theme directory and run the following
	- `npm install`
	- `bower install`
	- `gulp build`
- Go back to your old terminal session and restart Ghost (CMD + C),  `npm start`
- Select the focus theme from the ghost admin

## Build for Production

- `npm install` make sure we have the most up to date npm modules
- `bower install` make sure we have the most up to date bower components
- `gulp clean` make sure nothing is in the assets directory that shouldn't be
- `gulp build --prod` build all the assets for production
- `gulp zip` create a zip file for distribution
