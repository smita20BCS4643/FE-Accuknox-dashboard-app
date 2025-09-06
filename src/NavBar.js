import React, { useState } from 'react';

function NavBar({ searchTerm, onSearchChange, notifications }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(prev => !prev);

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '10px 20px',
      borderBottom: '1px solid #ddd',
      backgroundColor: '#fff',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      {/* Left: Breadcrumb */}
      <div style={{ fontSize: '14px', color: '#666' }}>
        Home {'>'} Dashboard V2
      </div>

      {/* Center: Search */}
      <input
        type="text"
        placeholder="Search anything..."
        value={searchTerm}
        onChange={onSearchChange}
        style={{
          padding: '6px 10px',
          borderRadius: '4px',
          border: '1px solid #ccc',
          width: '300px',
          fontSize: '16px',
        }}
      />

      {/* Right: Notifications and User */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', position: 'relative' }}>
        {/* Notification Icon */}
        <div style={{ position: 'relative', cursor: 'pointer' }} onClick={toggleDropdown}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-bell"
          >
            <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          {notifications.length > 0 && (
            <span style={{
              position: 'absolute',
              top: '-5px',
              right: '-5px',
              background: 'red',
              color: 'white',
              borderRadius: '50%',
              padding: '2px 6px',
              fontSize: '12px',
              fontWeight: 'bold',
            }}>
              {notifications.length}
            </span>
          )}

          {/* Dropdown panel */}
          {dropdownOpen && (
            <div style={{
              position: 'absolute',
              top: '30px',
              right: 0,
              width: '280px',
              maxHeight: '200px',
              overflowY: 'auto',
              backgroundColor: 'white',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              borderRadius: '6px',
              zIndex: 200,
              padding: '10px',
            }}>
              <h4 style={{ margin: '0 0 10px 0' }}>Notifications</h4>
              {notifications.length === 0 && <p style={{ fontSize: '14px', color: '#888' }}>No notifications</p>}
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {[...notifications].reverse().map((note, idx) => (
                  <li key={idx} style={{ padding: '6px 0', borderBottom: '1px solid #eee' }}>
                    {note}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* User Circle */}
        <div style={{
          width: '35px',
          height: '35px',
          borderRadius: '50%',
          backgroundColor: '#666',
          color: 'white',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontWeight: 'bold',
          cursor: 'pointer',
          userSelect: 'none',
        }}>
          U
        </div>
      </div>
    </div>
  );
}

export default NavBar;
