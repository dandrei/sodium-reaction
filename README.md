## FRP

If you aren't familiar with FRP, the [textbook definition](https://manning-content.s3.amazonaws.com/download/b/82db892-a770-433c-b32a-2ec56b6f49da/SC-01.pdf) is that:

    FRP allows functional programming to become a meta-language for event-based logic

If that sounds confusing, just think about an Excel spreadsheet. You simply declare the relationship between the cells, and never worry about what happens behind the scenes.

In the `SodiumFRP` TypeScript library, there are two important concepts, streams and cells. Cells hold values, streams propagate events. Cells react to changes in other cells.

How do we use these here?

- The callbacks that you bind to the components' event props (e.g. `onClick`, `onChange`, etc.) are functions that simply push values into streams.

- With `sodium-reaction`, defining state is as simple as defining the cells that hold the data. Cells react to streams firing as well as to changes in other cells.

The resulting data flow is:  `events -> streams -> cells -> state -> DOM`.

The DOM reacts to state (thanks to React), and state reacts to events (thanks to SodiumFRP).

## Sodium reaction

I called this project `sodium-reaction` because it brings together the two libraries: SodiumFRP and React.

There's hardly any boilerplate involved. You simply do the following:

- define the UI in one component. The UI is now little more than a template.
- define the event callbacks and state in another component.

## Code sample #1
The first example consists of a `+` and a `-` button which increment and decrement a value, respectively.

The nice thing about declarative code is that it reads almost exactly as you would describe it in words. It's not hard to get used to the FRP-specific functions (like `accum`, `hold`, `send`, `lift`, etc.).
1. We define a stream sink (a stream you can push values into), `value$`, which will handle incoming events.
2. We define a cell that accumulates values from the stream. Starting value is `0`.
3. We generate a headless component with two event-handlers (`up` and `dn` which push `1` and `-1` respectively into the `value$` stream), and a state definition which depends on the `value` cell.

Notice two things:
- Cells and streams are generic classes. You define explicitly what data types the objects contain. Type checking ensures that certain categories of bugs get taken off the table.
- There are no moving parts. The cells and streams get defined "in place". Data flows between them, but you're not concerned with how that happens. You just set up the pipes and that's it.

With React, the UI changes get abstracted away, you only need to manually handle state changes (via `setState`).

With React & FRP, state changes also get abstracted away.

## Code sample #2
The second example is slightly more complicated. There are two input boxes where you type numbers. The sum between these numbers gets displayed under the boxes.

1. We define a function that converts an integer to a string, returning `0` if the string isn't a number.
2. We define two `StreamSink<string>` objects, `a$` and `b$`. Why two? There are two independent text fields in the UI, so there are two streams of data.
3. Then we define two cells, `a` and `b` which hold the numbers that result when the above streams fire.
4. We define a third cell, `sum`. Its value gets recomputed when either `a` or `b` change.

## Code sample #3

The third example is a personal project, and it diverges from the ones proposed in the book. I wanted to combine the first two examples into a single interface which allows the user to do the following:
- Increment / decrement a value.
    - Incrementing the value adds an input box to the interface
    - Decrementing this value removes the last input box added
- Type integers in the input boxes
- Typing into any of the input boxes computes the sum of all the numbers in all the input boxes
- Remove specific input boxes on demand (each box has a "remove" button)
- The sum gets recomputed on every keystroke and when you remove a box

## Development

I set up the project with [Create React App](https://github.com/facebook/create-react-app), using the TypeScript setup.

To install: clone the repo then run either `npm install` or `yarn install`.

To run: all the standard CRA scripts work as expected. I just use `yarn start`.

Only the first 2 examples are available so far, but these are useful in getting a feel of what FRP is all about.

## Background
- [Functional Reactive Programming](https://www.manning.com/books/functional-reactive-programming) (the book, published by Manning)
- [sodium-typescript](https://github.com/SodiumFRP/sodium-typescript) (the TypeScript library written by the authors)

## Other
- This project discussed on [sodium.nz](http://sodium.nz/t/sodiumfrp-react-sodium-reaction/344).
