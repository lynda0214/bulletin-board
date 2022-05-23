# Welcome to Phase-Comments
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).<br/>
Mainly powered by [react-konva](https://github.com/konvajs/react-konva)

The demo page is [here](https://lynda0214.github.io/phase-comments/)

# Features
## Generics
scroll up and down can zoom out and in the while canvas

## Toolbar
In the downside, there's a toolbar.
1) A dropdown is for switching users.
2) buttons are for mode switch.
   1) Pointer: select a picture and drag it, delete it
   2) Picture: place another picture
   3) Comment: insert a new comment to the canvas or to the picture 
   4) Hand: drag and drop the whole canvas

## Picture
1) select it with pointer can a highlight outline and a remove button will show
2) click on the remove button can remove the picture
3) drag the picture will also reposition all the comments belong to it
4) delete the picture will also delete all the comments belong to it

## Comment
1) the initially added comment shows a starter layout for the current user to input the very first message
2) the avatar is representing the current user who added this comment
3) if the very first submitted message is empty then the comment would be removed 
4) messages can either be entered to submit or by clicking on the submit button
5) once the very first message is submitted, the layout would collapse
6) click on the collapsed layout avatar can open the comment thread layout
7) in the comment thread layout, there are two buttons resolve and close
8) click on the resolve button can also delete this comment
9) click on the close button can close the thread layout and back to the collapsed layout
10) in the bottom of the comment thread you can type new replies to this comment
11) if you switch user, the avatar of the reply message will change accordingly

## Available Scripts
In the project directory, you can run:
1) Run `npm install` to installed necessary dependencies
2) Run `npm run start` to see this app running on `localhost:3000`
3) Run `npm run test` to see the test results 
