# Welcome to Bulletin Board

[![youtube demo](https://i.imgur.com/tIFMX33.png)](https://youtu.be/5hVZ9sILnTk)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app),<br/>
and mainly powered by [react-konva](https://github.com/konvajs/react-konva)

The demo page is [here](https://lynda0214.github.io/bulletin-board/)

# Updates & Hotfixes :fire:
1) 220524 fix message invalid date
2) 220524 fix: prevent picture keeps adding at the same spot
3) 220524 feature: focus automatically when starting a comment
5) 220524 feature: remove automatically when blurring with empty comment
6) 220525 feature: select picture will move to top 
7) 220525 feature: unselect picture when switching modes

# Features
## Generics
scroll up and down can zoom out and in the while canvas

## Toolbar
In the downside, there's a toolbar.
1) A dropdown is for switching users.
2) buttons are for switching modes:
   1) Pointer: select a picture and then drag or delete it
   2) Picture: place a new picture to the canvas
   3) Comment: insert a new comment to the canvas or to the picture 
   4) Hand: drag and drop to reposition the whole canvas

## Picture
1) selecting it under pointer mode, a highlight outline and a remove button will show
2) clicking on the remove button removes the picture
3) dragging the picture will also reposition all the comments belong to it
4) deleting the picture will also delete all the comments belong to it

## Comment
1) the initially added comment shows a starter layout for the current user to input the very first message
2) the avatar represents the current user who added this comment
3) if the first submitted message is empty then the comment would be removed 
4) messages can either be submitted by pressing enter to clicking on the submit button
5) once the first message is submitted, the layout would collapse
6) clicking on the collapsed layout avatar opens the comment thread layout
7) in the comment thread layout, there are two buttons: resolve & close
8) clicking the resolve button deletes this comment
9) clicking the close button closes the thread, and the collapsed layout will show
10) in the bottom of the comment thread, you can type new replies to this comment
11) if you switch user, the avatar of the reply message will change accordingly

## Available Scripts
In the project directory, you can run:
1) Run `npm install` to installed necessary dependencies
2) Run `npm run start` to see this app running on `localhost:3000`
3) Run `npm run test` to see the test results 

## Acknowledgements
Special thanks to [@movehand](https://github.com/movehand) and [@sposusu](https://github.com/sposusu) for spotting out the errors!
