import { useEffect, useState } from "react";

const Async = () => {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/posts")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                setPosts(data);
                setError(null);
            })
            .catch((err) => {
                console.error("Fetch error:", err.message);
                setError(err.message);
                setPosts([]);
            });
    }, []);

    return (
        <div>
            {error && <p data-testid="error-message">Error: {error}</p>}
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>{post.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default Async;
