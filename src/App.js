import "./App.css";
import Greeting from "./components/Greeting/Greeting";
import Async from "./components/Async/Async";
import UserProfile from "./components/UserProfile/UserProfile";
import Counter from "./components/Counter/Counter";
import LoginForm from "./components/LoginForm/LoginForm";

function App() {
    return (
        <div className="app">
            <Greeting />
            <Async />
            <UserProfile />
            <Counter />
            <LoginForm />
        </div>
    );
}

export default App;
