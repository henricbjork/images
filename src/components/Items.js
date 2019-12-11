import React from 'react';

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
