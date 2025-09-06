import React from 'react';

function Widget({ widget, categoryId, onRemoveWidget }) {
  const handleRemove = () => {
    if (window.confirm(`Are you sure you want to delete the widget "${widget.name}"?`)) {
      onRemoveWidget(categoryId, widget.id);
    }
  };

  return (
    <div style={{
      border: '1px solid #ccc',
      borderRadius: '6px',
      padding: '15px',
      width: '250px',
      position: 'relative',
      backgroundColor: '#f9f9f9',
      boxShadow: '1px 2px 5px rgba(0,0,0,0.1)'
    }}>
      <button
        onClick={handleRemove}
        style={{
          position: 'absolute',
          top: '5px',
          right: '5px',
          border: 'none',
          background: 'transparent',
          cursor: 'pointer',
          fontSize: '18px',
          fontWeight: 'bold',
          color: '#888'
        }}
        aria-label={`Remove widget ${widget.name}`}
      >
        &times;
      </button>
      <h3 style={{ margin: '0 0 10px 0' }}>{widget.name}</h3>
      <p style={{ margin: 0 }}>{widget.text}</p>
    </div>
  );
}

export default Widget;
