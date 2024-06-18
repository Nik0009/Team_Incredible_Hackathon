
import React from 'react';

function Notification({ message }) {
  return (
    <div className="alert alert-warning alert-dismissible fade show" role="alert">
      <strong>Notification:</strong> {message}
      <button type="button" className="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
}

export default Notification;