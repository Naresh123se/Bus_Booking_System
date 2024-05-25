import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const Private = ({ component: Component, ...rest }) => {
  // Check if user is authenticated (you can modify this condition based on your authentication logic)
  const storedValue = localStorage.getItem('user') || localStorage.getItem('userInfo');
  const userData = JSON.parse(storedValue);
  const userName = userData.displayName || userData.name;
  const email = userData.email || userData.email;
  const id = userData._id || userData._id;
  const status = userData._id || userData._id;
  const isLoggedIn = userData._id || userData._id;
  
  const isAuthenticated = localStorage.getItem('userInfo') === 'true';

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default Private;
