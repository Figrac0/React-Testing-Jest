import { useState } from "react";

const Counter = ({ initialValue = 0, onCounterChange }) => {
    const [count, setCount] = useState(initialValue);

    const increment = () => {
        const newCount = count + 1;
        setCount(newCount);
        onCounterChange?.(newCount);
    };

    const decrement = () => {
        const newCount = count - 1;
        setCount(newCount);
        onCounterChange?.(newCount);
    };

    const reset = () => {
        setCount(0);
        onCounterChange?.(0);
    };

    return (
        <div>
            <h2>
                Counter: <span>{count}</span>
            </h2>
            <button onClick={increment} aria-label="Increment">
                +
            </button>
            <button onClick={decrement} aria-label="Decrement">
                -
            </button>
            <button onClick={reset}>Reset</button>
        </div>
    );
};

export default Counter;
