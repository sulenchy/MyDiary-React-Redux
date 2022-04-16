import React from 'react';
import ReactDOM from 'react-dom';
import { Link, withRouter } from 'react-router-dom';
import Icon from '../svgs';

function Sidebar({
  payload, isSidebarShown, logoutUser, history, toggleSidebar
}) {
  const handleLogout = () => {
    history.push('/');
    logoutUser();
  };

  return ReactDOM.createPortal(
    <div
      id="mySidenav"
      className="sidenav"
      style={{
        display: isSidebarShown ? 'flex' : ''
      }}>
      {
        payload.user && payload.user[0].passporturl !== 'https://goo.gl/eUu3Qw'
          ? <a href="#" id="profile-pic"><img className="img-center" id="img-element" alt="Avatar" src={payload.user[0].passporturl} /></a>
          : <Icon.Avatar className="img-center" style={{ fill: '#fff' }} />
      }
      <ul style={{ width: '100%', padding: '0' }}>
        <li><Link to="/" id="username" onClick={toggleSidebar}>{payload.user ? payload.user[0].fullname : '' }</Link></li>
        <li><hr /></li>
        <li><Link id="entries" to="/" onClick={toggleSidebar}>Home</Link></li>
        <li><Link id="entries" to="/" onClick={toggleSidebar}>User Profile</Link></li>
        <li><a id="logout-small" href="#" className="logout" onClick={handleLogout}>Logout</a></li>
      </ul>
    </div>,
    document.getElementById('sidebar-portal')
  );
}

export default withRouter(Sidebar);
