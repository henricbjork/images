import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

const SearchUser = props => {
  return (
    <div>
      {console.log(props)}
      <p>{props.user.email}</p>
    </div>
  );
};
export default SearchUser;
