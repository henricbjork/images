import React, {useState, useEffect} from 'react';

const User = props => {
  const {onUpdate} = props;

  const follow = async user => {
    const formData = new FormData();
    formData.append('id', user);

    const response = await fetch('http://localhost:1111/api/users/follow.php', {
      method: 'POST',
      body: formData,
      credentials: 'include'
    });
    onUpdate();
  };
  return (
    <div className="users-text">
      {props.user.followed === 0 ? (
        <button
          onClick={() => follow(props.user.id)}
        >{`Follow ${props.user.email}`}</button>
      ) : (
        <button
          onClick={() => follow(props.user.id)}
        >{`Following ${props.user.email}`}</button>
      )}
    </div>
  );
};
export default User;
