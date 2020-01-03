const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    const data = await fetch('https://localhost:1111/api/posts/posts', {
      credentials: 'include'
    });
    const response = await data.json();
    console.log(response);
    setPosts(response);
  };

  return (
    <div>
      {posts.map(post => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};
