import {useEffect} from "react";
import {useState} from "react";
import {Link} from "react-router-dom";

export function View() {
  const [posts, setPosts] = useState([]);
  const [done, setDone] = useState(false);
  useEffect(() => {
    (async function () {
      const req = await fetch("http://localhost:3000/blog/");
      const json = await req.json();
      setPosts(json);
    })();
  }, [done]);

  async function handleSubmit(title, content, e) {
    e.preventDefault();
    const requestData = JSON.stringify({title, content});
    console.log(requestData);
      const headers = {"content-type": "application/json"};
    fetch("http://localhost:3000/blog/delete-post", {
          method: "POST", body: requestData,
          headers: headers,
        })
        console.log(json);
        setDone(true);   
    }

  return (
    <div>
      <Link to="/"> Home</Link>
      <div>
        {posts.map((post) => (
          <div
            style={{
              border: "2px solid",
              width: "50vw",
              margin: "auto",
              textAlign: "center",
            }}
          >
            <h2 style={{margin: "0.2rem"}}>{post.title}</h2>
            <div>{post.content}</div>
            <button onClick={(e) => handleSubmit(post.title, post.content, e)}>
              Delete Post
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}