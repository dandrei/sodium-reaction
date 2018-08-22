## Motivation

Originally, this project was aimed at simply getting graforlock's [sodium-typescript-examples](https://github.com/graforlock/sodium-typescript-examples) to work React, as I was reading the FRP ([Functional Reactive Programming](https://www.manning.com/books/functional-reactive-programming)) book at the time.

I adapted the first two examples. All the FRP code was executed inside `componentDidMount`. It worked, but mixing React and Sodium code inside a simple component looked clumsy and it wasn't at all clear why anyone should go to the trouble of using them together.

After the initial commit, I slept on it for a few months while working on other projects, and decided there's a better way. Inspired by Merrick Christensen's [Headless User Interface Components](https://twitter.com/iammerrick/status/1011280034626134016), I decided to separate the UI from the data, and to create a standardized way for React to talk to Sodium. I also simplified the code in order to demonstrate the advantages of using Sodium with React.

The UI component now simply consumes the state of a headless component that is bound to the FRP code. This allows the state to be built in an declarative manner.

But wait, isn't React already declarative? React is declarative when it comes to mapping the state to the DOM. But you're still in imperative land when it comes to actually building the state. FRP also makes building the state declarative.

## FRP

If you are't familiar with FRP, the [textbook definition](https://manning-content.s3.amazonaws.com/download/b/82db892-a770-433c-b32a-2ec56b6f49da/SC-01.pdf) is that:

```FRP allows functional programming to become a meta-language for event-based logic```

If that sounds confusing, just think about an Excel spreadsheet. You simply declare the relationship between the cells, and never worry about what happens behind the scenes.

In the `SodiumFRP` TypeScript library, there are two important concepts, streams and cells. Cells hold values, streams propagate events. Cells react to changes in other cells. As a convention, stream variable names are terminated in `$`.

How do we use these here?

- The callbacks that you bind to the components' event props (e.g. `onClick`, `onChange`, etc.) are functions that simply push values into streams.

- With `sodium-reaction`, defining state is as simple as defining the cells that hold the data. Cells react to streams firing as well as to changes in other cells.

The resulting data flow is:  `events -> streams -> cells -> state -> DOM`.

The DOM reacts to state (thanks to React), and state reacts to events (thanks to SodiumFRP).

## Sodium reaction

I called this project `sodium-reaction` because it brings together the two libraries: SodiumFRP and React.

The core is made up of a headless component and three helper functions, of which:

- Only a single function is actually exported and used outside.
- The component is used internally to hold state (using `setState`). Changes to its state will be propagated to the consumer (the UI component).

The exported function, `sodiumReaction(props, state)`, takes in two parameters:

- a `props` object (containing the event callbacks).
- a `state` definition object containing Sodium cells.

The `state` definition object isn't the actual state. Behind the scenes, changes to the cells will execute callbacks that push the actual values into the headless component's state using `setState`.

The state definition that you send to `sodiumReaction` has the same structure as the actual state that the UI component receives.

There's hardly any boilerplate involved. You simply:

- define the UI in one component. The UI is now little more than a template, it can even be a functional component.
- define the event callbacks and state in a TypeScript function that configures and returns a headless component.
- include the headless component in the UI component (the consumer). The headless component provides the consumer with the event callbacks and the state.

## Code sample #1
The first example consists of a `+` and a `-` button which increment and decrement a value, respectively.

I stripped the includes so as not to take too much space.

### Consumer
```
export default (props) => (
    <Provider>
        {({up, dn, state: {value}}) => (
            <Fragment>
                <div>
                    <button onClick={up}>+</button>
                    <button onClick={dn}>-</button>
                </div>
                <span>{value}</span>
            </Fragment>
        )}
    </Provider>
);
```
Notice that the component has no logic, and it just binds events and displays state.

### Provider
```
export default function () {
    const value$ = new StreamSink<number>();
    const value: Cell<number> = value$.accum(0, (a, v) => a + v);

    return sodiumReaction({
            up: () => value$.send(1),
            dn: () => value$.send(-1)
        },
        {value}
    );
};
```
The nice thing about declarative code is that it reads almost exactly as you would describe it in words. It's not hard to get used to the FRP-specific functions (like `accum`, `hold`, `send`, `lift`, etc.).
1. We define a stream sink (a stream you can push values into), `value$`, which will handle incoming events.
2. We define a cell that accumulates values from the stream. Starting value is `0`.
3. We generate a headless component with two event handlers (`up` and `dn` which push `1` and `-1` respectively into the `value$` stream), and a state definition which depends on the `value` cell.

Notice two things:
- Cells and streams are generic classes. You define explicitly what data types the objects contain. With a smart IDE, certain categories of bugs are taken off the table.
- There are no moving parts. The cells and streams are defined "in place". Data flows between them, but you're not concerned with how that happens. You just set up the pipes and that's it.

With jQuery, you had to manually trigger both the data changes, and the UI changes.

With React, the UI changes are abstracted away, you only need to manually handle state changes (via `setState`).

With React & FRP, state changes are also abstracted away.

## Code sample #2
The second example is slightly more complicated. There are two input boxes where you type numbers. The sum between these numbers is displayed under the boxes.

### Consumer
```
export default (props) => (
    <Provider>
        {({changedA, changedB, state: {sum}}) => (
            <Fragment>
                <div>
                    <input onChange={changedA}/>
                    <input onChange={changedB}/>
                </div>
                <span>{sum}</span>
            </Fragment>
        )}
    </Provider>
);
```

### Provider
```
export default function () {

    const validNumber = s => {
        const res = parseInt(s, 10);
        return isNaN(res) ? 0 : res;
    };

    const a$ = new StreamSink<string>();
    const b$ = new StreamSink<string>();

    const a: Cell<number> = a$.hold("0").map(validNumber);
    const b: Cell<number> = b$.hold("0").map(validNumber);

    const sum: Cell<number> = a.lift(b, (a_, b_) => a_ + b_);

    return sodiumReaction({
            changedA: (e) => a$.send(e.target.value),
            changedB: (e) => b$.send(e.target.value)
        },
        {sum}
    );
};
```
What is going on here?
1. We define a function that converts an integer to a string, returning `0` if the string isn't a number.
2. We define two stream sinks, `a$` and `b$`. Why two? There are two independent text fields in the UI, so there are two streams of data.
3. Then we define two cells, `a` and `b` which hold the numbers that result when the above streams fire.
4. We define a third cell, `sum`, by defining it in relation to `a` and `b`.
5. We generate the headless component using the event callbacks (which send values to streams), and the state definition.

## Development

The project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). All work done in TypeScript was transpiled automatically to JS from the IDE. You'll want to look at the TS source, not at the generated JS code.

No automated transpilation support is included in the initial release, but if you use an IDE that does this out of the box (like WebStorm), you should be able to play with the examples directly.

To install: clone the repo then run either `npm install` or `yarn install`.

To run: all the standard CRA scripts work as expected. I just use `yarn start`.

Only the first 2 examples are available so far, but these are useful in getting a feel of what FRP is all about. I plan to add the third example as well, but that will require a severe departure from how things are done in the original repo.

## Background
- [Functional Reactive Programming](https://www.manning.com/books/functional-reactive-programming) (the book, published by Manning)
- [sodium-typescript](https://github.com/SodiumFRP/sodium-typescript) (the TypeScript library written by the authors)