import { useState } from "react";
import Output from "./Output";

function Greeting() {
    const [changedText, setChangedText] = useState();

    function changedTextHandler() {
        setChangedText((prevText) => !prevText);
    }

    return (
        <div>
            <h2>Hello world!</h2>
            {!changedText && <Output>It's good to see you!</Output>}
            {changedText && <Output>Changed!</Output>}
            <button onClick={changedTextHandler}>Change Text!</button>
        </div>
    );
}

export default Greeting;
