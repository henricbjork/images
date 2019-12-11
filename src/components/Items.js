import React, {useContext} from 'react';
// import {Link} from 'react-router-dom';
// import {AppContext} from './Context';

const Items = props => {
  return (
    <div>
      {console.log(props)}
      {props.data.map(image => (
        <li key={image.id}>{image.content}</li>
      ))}
    </div>
  );
};

export default Items;
