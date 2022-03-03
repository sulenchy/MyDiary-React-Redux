import React from 'react';
import ReactDOM from 'react-dom';
import Icon from '../svgs';

export default function Sidebar({
  payload, isSidebarShown, handleLogout
}) {
  return ReactDOM.createPortal(
    <div id="mySidenav" className="sidenav" style={{ display: isSidebarShown ? 'block' : '' }}>
      {
        payload.user && payload.user[0].passporturl
          ? <a href="#" id="profile-pic"><img className="img-center" id="img-element" alt="Avatar" src={payload.user[0].passporturl} /></a>
          : <Icon.Avatar className="img-center" style={{ fill: '#fff' }} />
      }
      <a id="username" href="#">{payload.user ? payload.user[0].fullname : '' }</a>
      <hr />
      <a id="entries" href="#">Entries</a>
      <a id="profile" href="#">User Profile</a>
      <a id="logout-small" href="#" className="logout" onClick={handleLogout}>Logout</a>
    </div>,
    document.getElementById('sidebar-portal')
  );
}
