import React from 'react';
import { Redirect } from 'react-router-dom';

function sidebar(props) {
  if (props.login) {
    return <div>Sidebar</div>;
  }

  return <Redirect to="/" />;
}

export default sidebar;
