import React, {useState, useEffect} from 'react';
import Items from './Items';

const Start = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const data = await fetch(
      `http://localhost:1111/src/backend/app/posts/posts.php`
    );

    const response = await data.json();
    setImages(response);
  };

  // handleSubmit = evt => {
  //   evt.preventDefault();
  //   const {email, password} = this.state;
  //   fetch(
  //     `http://localhost:8888/registration?email=${email}&password=${password}`,
  //     {
  //       method: 'GET'
  //     }
  //   )
  //     .then(res => res.json())
  //     .then(response => {
  //       if (!response.error) {
  //         this.props.onAuthenticate(response.session_token);
  //       } else {
  //         this.setState({error: JSON.stringify(response.error.message)});
  //       }
  //     })
  //     .catch(error => this.setState({error: 'Something went wrong'}));
  // };

  return <div>hej</div>;
};

export default Start;
