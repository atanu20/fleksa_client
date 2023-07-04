import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Error = () => {
  const his = useHistory();
  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);
  return (
    <>
      <div className="error">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-12 mx-auto">
              <h1>404 Error !! Page Not Found</h1>
              <button
                className="btn btn-primary mt-3"
                onClick={() => his.goBack()}
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Error;
