import React from 'react';
import ReactDOM from 'react-dom';


export default function Modal({
  children, isOpen, closeFn, className, headerText
}) {
  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <div id="modalBox" className={className} role="dialog">
      <div className="modal-container">
        <header className="imgcontainer">
          <button type="button" className="close" onClick={closeFn}>&times;</button>
          <h2>{headerText}</h2>
        </header>
        {children}
      </div>
    </div>,
    document.getElementById('portal')
  );
}
