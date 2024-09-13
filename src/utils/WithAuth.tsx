// components/withAuth.js
import { useRouter } from 'next/router';
// import Loader from '../components/Loader';
import React, { useEffect, useState } from 'react';

const withAuth = (WrappedComponent:React.FC, options = { redirectTo: '/login' }) => {
  const { redirectTo } = options;

  return function AuthenticatedComponent(props:any) {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
      const isAuth = (!!JSON.parse(window.sessionStorage.getItem('user') as string));
      if (isAuth) {
        setIsAuthenticated(true);
      }else {
        setIsAuthenticated(false);
        router.push(redirectTo);
      }
    }, [router, redirectTo]);

    // If the user is authenticated or loading, render the wrapped component
    return isAuthenticated ? <WrappedComponent {...props} /> : null;
  };
};

export default withAuth;