import React, { useState, useRef, useEffect } from "react";

function DashboardHeader({
  onAddWidgetClick,
  onRefreshClick,
  onMoreOptionSelect,
  timeRange,
  onTimeRangeChange,
}) {
  const [moreOpen, setMoreOpen] = useState(false);
  const [timeDropdownOpen, setTimeDropdownOpen] = useState(false);

  const moreRef = useRef();
  const timeRef = useRef();

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (moreRef.current && !moreRef.current.contains(e.target)) {
        setMoreOpen(false);
      }
      if (timeRef.current && !timeRef.current.contains(e.target)) {
        setTimeDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const timeOptions = [
    "Last 2 days",
    "Last 7 days",
    "Last 30 days",
    "Custom Range",
  ];

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "32px",
      }}
    >
      <h1 style={{ margin: 0, fontWeight: "bold" }}>CNAPP Dashboard</h1>

      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        {/* Add Widget button */}
        <button
          onClick={onAddWidgetClick}
          style={{
            background: "#fff",
            border: "1px solid #d4d7e1",
            borderRadius: "6px",
            padding: "7px 18px",
            fontWeight: 600,
            fontSize: "15px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
          aria-label="Add Widget"
        >
          Add Widget
          <span style={{ fontSize: "18px", fontWeight: "bold", lineHeight: "18px" }}>
            +
          </span>
        </button>

        {/* Refresh button */}
        <button
          onClick={onRefreshClick}
          style={{
            background: "#fff",
            border: "1px solid #d4d7e1",
            borderRadius: "6px",
            padding: "6px 10px",
            cursor: "pointer",
          }}
          aria-label="Refresh dashboard"
          title="Refresh dashboard"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.38 7.85A6.5 6.5 0 1 1 10 16.5M1.75 7.75h4.5v4.5"
              stroke="#2d3a53"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* More options button */}
        <div ref={moreRef} style={{ position: "relative" }}>
          <button
            onClick={() => setMoreOpen((prev) => !prev)}
            style={{
              background: "#fff",
              border: "1px solid #d4d7e1",
              borderRadius: "6px",
              padding: "6px 10px",
              cursor: "pointer",
            }}
            aria-haspopup="true"
            aria-expanded={moreOpen}
            aria-label="More options"
            title="More options"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="4.5" cy="10" r="1.5" fill="#2d3a53" />
              <circle cx="10" cy="10" r="1.5" fill="#2d3a53" />
              <circle cx="15.5" cy="10" r="1.5" fill="#2d3a53" />
            </svg>
          </button>

          {moreOpen && (
            <ul
              style={{
                position: "absolute",
                top: "calc(100% + 6px)",
                right: 0,
                background: "white",
                border: "1px solid #d4d7e1",
                borderRadius: "6px",
                listStyle: "none",
                padding: "10px 0",
                margin: 0,
                width: "160px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                zIndex: 1000,
              }}
              role="menu"
              aria-label="More options menu"
            >
              {["Settings", "Export", "Help"].map((item) => (
                <li
                  key={item}
                  onClick={() => {
                    setMoreOpen(false);
                    onMoreOptionSelect(item);
                  }}
                  style={{
                    padding: "8px 20px",
                    cursor: "pointer",
                    fontSize: "14px",
                    color: "#222",
                  }}
                  role="menuitem"
                  tabIndex={0}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      setMoreOpen(false);
                      onMoreOptionSelect(item);
                    }
                  }}
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Time range dropdown */}
        <div ref={timeRef} style={{ position: "relative" }}>
          <button
            onClick={() => setTimeDropdownOpen((prev) => !prev)}
            style={{
              background: "#fff",
              border: "2px solid #1d369f",
              color: "#1d369f",
              borderRadius: "8px",
              padding: "6px 16px",
              fontWeight: 600,
              fontSize: "15px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              marginLeft: "2px",
              cursor: "pointer",
            }}
            aria-haspopup="true"
            aria-expanded={timeDropdownOpen}
            aria-label="Select time range"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="10"
                cy="10"
                r="9"
                stroke="#1d369f"
                strokeWidth="2"
              />
              <path
                d="M10 5v5l3 3"
                stroke="#1d369f"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {timeRange}
            <span style={{ fontSize: "10px", marginLeft: "4px" }}>▼</span>
          </button>

          {timeDropdownOpen && (
            <ul
              style={{
                position: "absolute",
                top: "calc(100% + 6px)",
                right: 0,
                background: "white",
                border: "1px solid #d4d7e1",
                borderRadius: "6px",
                listStyle: "none",
                padding: "10px 0",
                margin: 0,
                width: "160px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                zIndex: 1000,
              }}
              role="menu"
              aria-label="Time range selection"
            >
              {["Last 2 days", "Last 7 days", "Last 30 days", "Custom Range"].map(
                (option) => (
                  <li
                    key={option}
                    onClick={() => {
                      setTimeDropdownOpen(false);
                      onTimeRangeChange(option);
                    }}
                    style={{
                      padding: "8px 20px",
                      cursor: "pointer",
                      fontSize: "14px",
                      color: "#222",
                    }}
                    role="menuitem"
                    tabIndex={0}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        setTimeDropdownOpen(false);
                        onTimeRangeChange(option);
                      }
                    }}
                  >
                    {option}
                  </li>
                )
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default DashboardHeader;
