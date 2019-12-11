const getPosts = async () => {
  const data = await fetch(
    // 'http://localhost:1111/src/backend/app/posts/upload.php'
    `http://localhost:1111/src/backend/app/posts/posts.php`
  );
  const result = await data.json();
  console.log(result);
};

getPosts();

const login = async () => {
  const email = 'bob@belcher.com';
  const data = await fetch(
    'http://localhost:1111/src/backend/app/users/login.php',
    {
      method: 'POST',
      body: email,
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
  const result = await data.json();
  console.log(result);
};

login();
