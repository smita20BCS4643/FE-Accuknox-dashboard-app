import React from 'react';

function Widget({ widget }) {
  return (
    <div>
      <h3>{widget.name}</h3>
      <p>{widget.text}</p>
      <button>X</button> {/* Remove functionality to be added */}
    </div>
  );
}

export default Widget;
