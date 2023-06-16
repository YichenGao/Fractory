import React, {useState} from "react";

import "./Tutorial.css";

type Props = {
    onProceedClick: () => void
}

const Tutorial = (props: Props) => {
    return (<div className="tutorial_container">
    <div className="tutorial-content_container">
        <div className = "tutorial-title_text">
            Fractals Explained
        </div>
        <div className="tutorial-body-text_container">
        <p className="tutorial_text">
            To understand how this app generates fractals, we must start with symbols, in this app represented as capital letters such as <span className="tutorial-bold">A</span> or <span className="tutorial-bold">B</span>.
            In its simplest form, first, an <span className="tutorial-bold">initial state</span> consisting of these symbols is chosen. Then, on each subsequent step, or <span className="tutorial-bold">iteration</span>, 
            all the symbols in the initial state are replaced by their corresponding <span className="tutorial-bold">replacement rule</span>. 
        </p>
        <p className="tutorial_text">
            For example, assume the initial state 
            is <span className="tutorial-bold">A</span>, and it is replaced by <span className="tutorial-bold">AA</span> (in fact, you can try this!). Then on the next iteration, 
            the current state would be <span className="tutorial-bold">AA</span>, the next step would have 4 A's, and then 8, and so on. More complex rules involving multiple letters can be devised.
        </p>
        <p className="tutorial_text">But what does this have to do with fractals? Each symbol corresponds to a <span className="tutorial-bold">pattern</span> that is drawn out on your screen. 
            Each pattern must have a <span className="tutorial-bold">starting point</span> and <span className="tutorial-bold">ending point</span> so that this app can know where to place the pattern for the next symbol. 
            The starting point of the next pattern is laid onto the location of the ending point of the previous pattern.</p>
        <p className="tutorial_text">There is one final piece: based on the previous information alone, the app could only lay pattern after pattern in a straight line, which would not be very interesting. 
            Thus, <span className="tutorial-bold">operators</span> are introduced, in this app represented by <span className="tutorial-bold">+, -, =</span> and so on, which instead of becoming a pattern, 
            tell the app to rotate by a certain angle instead.</p>
        <p className="tutorial_text">And that, as it turns out, is all you need to construct an infinite variety of fractals (the symbols, rules, operators, and patterns for one fractal, the Dragon Curve, has been pre-loaded).
            Feel free to change any of these in any way you like, to create your own custom fractal of your imagination! A few words of advice from the creator:
        </p>
        <ul>
            <li>
                <span className="tutorial-bold">Patterns</span> are the most intuitive customization, and can bring a fractal to life with colors and shapes.
            </li>
            <li>
                <span className="tutorial-bold">Symbols and operators</span> determine the fundamental nature of the fractal, and changing these results in the most chaotic and fun alterations. (Suggestion: replace the replacement rule for A with A+A-)
            </li>
            <li>
                As you might have expected from the example of replacement rules, the complexity of fractals grows exponentially with the number of iterations. At higher numbers of iterations (roughly beyond 12, depending on your computer) 
                you may experience increasing amounts of lag and performance issues. Experimenting is best done at lower iterations, then increasing the number of iterations towards the limit once you've found a fractal you'd like to explore on.
            </li>
            <li>
                Want to learn more? Want more examples? Check out <a href="https://en.wikipedia.org/wiki/L-system" target="_blank">Lindenmayer systems</a>.
            </li>
        </ul>
        </div>
        
        
        <div className="tutorial-proceed_button" onClick={(event) => props.onProceedClick()}>
                    Close
        </div>
    </div>
</div>);
}

export default Tutorial;