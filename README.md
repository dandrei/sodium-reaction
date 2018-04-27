##### Overview
This project is aimed at making graforlock's [sodium-typescript-examples](https://github.com/graforlock/sodium-typescript-examples) work in React.  

It was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app), and all work done in TypeScript was transpiled automatically to JS.

To install: clone the repo then run either `npm install` or `yarn install`.

To run: all the standard CRA scripts work as expected. I just use `yarn start`.

Only the first 2 examples are available so far, but these are useful in getting a feel of what FRP is all about. I plan to add the third example as well, but that will require a severe departure from how things are done in the original repo.

No automated transpilation support is included in the initial release, but if you use an IDE that does this out of the box (like WebStorm), you should be able to play with the examples directly.

##### Methodology

In order to integrate the examples in React, I had to strip away all GUI code, and separated the FRP code in `componentDidMount`. I think this is a much cleaner way of doing things.

The FRP code only interacts with React on input and output, and the core code adheres to functional principles.

##### Files

`SExample1.tsx` is the first example with minimal changes done to the FRP code as written by graforlock.

`RExample1.tsx` and `RExample2.tsx` are the first two examples, but the changes to the FRP code are more extensive, as I've decided to play around in order to understand it.

`sodium-reaction.ts` is a helper file with one important function, `pair`, which returns two entities:
- A function which ought to be called in order to feed data into the FRP code 
- A `Cell` object which takes the data from the above function and passes it along the FRP data flow.

This way, the contact point between Sodium and React has a minimal footprint. 

##### Background
- [Functional Reactive Programming ](https://www.manning.com/books/functional-reactive-programming) (the book, published by Manning)
- [sodium-typescript](https://github.com/SodiumFRP/sodium-typescript) (the TypeScript library written by the authors)

