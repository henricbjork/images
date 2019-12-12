const getPosts = async () => {
  const data = await fetch(
    `http://localhost:1111/src/backend/app/posts/getposts.php`
  );
  const result = await data.json();
  console.log(result);
};

// getPosts();

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
  const json = await data.json();
  console.log('Success:', JSON.stringify(json));
};

// login();

const upload = async () => {
  const data = 'hej';
  // console.log(data);

  const response = await fetch(
    'http://localhost:1111/src/backend/app/posts/upload.php',
    {
      method: 'POST',
      body: data,
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
  const json = await response.json();
  console.log('Success:', JSON.stringify(json));
};

// upload();

const uploadNew = async () => {
  // const data = 'hej';
  // console.log(data);

  // const response = await fetch(
  //   'http://localhost:1111/src/backend/app/posts/upload.php',
  //   {
  //     method: 'POST',
  //     body: data,
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   }
  // );
  const data = await fetch(
    'http://localhost:1111/src/backend/app/posts/upload-new.php'
  );
  const json = await data.json();
  console.log('Success:', JSON.stringify(json));
};

uploadNew();
