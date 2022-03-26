import React from 'react';
import ReactDOM from 'react-dom';
import Icon from '../svgs';

export default function Sidebar({
  payload, isSidebarShown, handleLogout
}) {
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
        <li><a id="username" href="#">{payload.user ? payload.user[0].fullname : '' }</a></li>
        <li><hr /></li>
        <li><a id="entries" href="#">Entries</a></li>
        <li><a id="profile" href="#">User Profile</a></li>
        <li><a id="logout-small" href="#" className="logout" onClick={handleLogout}>Logout</a></li>
      </ul>
    </div>,
    document.getElementById('sidebar-portal')
  );
}
