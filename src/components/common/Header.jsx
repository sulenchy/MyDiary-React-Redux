import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

function Header({
  toggleSidebar, logoutUser, history, userPayload
}) {
  const handleLogout = () => {
    history.push('/');
    logoutUser();
  };

  useEffect(() => {
    const { token = '' } = JSON.parse(localStorage.getItem('MY_DIARY_USER')) ? JSON.parse(localStorage.getItem('MY_DIARY_USER')).data : {};
    if (userPayload.message === 'User is unauthorized' || !token) {
      handleLogout();
    }
  });

  return (
    <div className="row bottom-border fixed-header">
      <div className="left">
        <h2>
          <button
                    className="hamburgerIcon" onClick={toggleSidebar} type="button">
                    &#9776;
          </button>
          {' '}
&nbsp;&nbsp; &nbsp;&nbsp; My Diary... Your Thoughts & Feelings

        </h2>
      </div>
      <div className="full-width show-big-screen" style={{ padding: '5px' }}>
        <a id="logout-big" href="#" className="btn" onClick={handleLogout}>Logout</a>
      </div>
    </div>
  );
}

Header.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  userPayload: PropTypes.object.isRequired
};

export default withRouter(Header);
