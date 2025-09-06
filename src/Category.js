import React, { useState } from "react";
import Widget from "./Widget";

function Category({
  category,
  onAddWidget,
  onRemoveWidget,
  showModal = false,
  onCloseModal = () => {},
}) {
  const [internalShowModal, setInternalShowModal] = useState(false);
  const [selectedWidgets, setSelectedWidgets] = useState([]);
  const [activeTab, setActiveTab] = useState("CSPM");

  const isModalOpen = showModal || internalShowModal;

  // Widgets grouped by category tab
  const widgetsByTab = {
    CSPM: [
      { id: "widget1", name: "Cloud Accounts" },
      { id: "widget2", name: "Cloud Account Risk Assessment" },
    ],
    CWPP: [
      { id: "widget3", name: "Workload Alerts" },
      { id: "widget4", name: "Registry Scan" },
    ],
    Image: [{ id: "widget5", name: "Image Security Issues" }],
    Ticket: [{ id: "widget6", name: "Ticket Widget 1" }],
  };

  // Toggle widget selection checkbox
  const toggleSelect = (widgetId) => {
    setSelectedWidgets((prev) =>
      prev.includes(widgetId)
        ? prev.filter((id) => id !== widgetId)
        : [...prev, widgetId]
    );
  };

  // Open modal (internal only if external control not provided)
  const openModal = () => {
    if (!showModal) setInternalShowModal(true);
  };

  // Close modal and reset selection
  const closeModal = () => {
    if (!showModal) setInternalShowModal(false);
    else onCloseModal();
    setSelectedWidgets([]);
  };

  // Confirm adding selected widgets to this category
  const confirmSelection = () => {
    selectedWidgets.forEach((id) => {
      const widgetToAdd = Object.values(widgetsByTab)
        .flat()
        .find((w) => w.id === id);
      if (widgetToAdd) {
        // Prevent duplicate widgets in category
        if (!category.widgets.some((w) => w.name === widgetToAdd.name)) {
          onAddWidget(category.id, {
            ...widgetToAdd,
            text: "Random text for " + widgetToAdd.name,
            id: `${widgetToAdd.id}-${Date.now()}`,
          });
        }
      }
    });
    closeModal();
  };

  // Widgets for currently active tab
  const filteredWidgets = widgetsByTab[activeTab] || [];

  return (
    <div style={{ marginBottom: "40px" }}>
      <h2 style={{ fontWeight: 600, color: "#333" }}>{category.name}</h2>

      {/* Widget grid including all widgets & add widget card */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "24px",
          marginTop: "20px",
        }}
      >
        {category.widgets.map((widget) => (
          <Widget
            key={widget.id}
            widget={widget}
            categoryId={category.id}
            onRemoveWidget={onRemoveWidget}
          />
        ))}

        <div
          onClick={openModal}
          style={{
            border: "2px dashed #ccc",
            borderRadius: "12px",
            cursor: "pointer",
            color: "#999",
            fontWeight: 600,
            fontSize: "22px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "140px",
            height: "100%",
            background: "#f7f9fa",
            textAlign: "center",
          }}
          aria-label="Add Widget"
          tabIndex={0}
          role="button"
          onKeyPress={(e) => {
            if (e.key === "Enter") openModal();
          }}
        >
          + Add Widget
        </div>
      </div>

      {/* Modal drawer */}
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            right: 0,
            width: "45vw",
            height: "100vh",
            background: "white",
            boxShadow: "-4px 0 24px rgba(24,36,50,0.06)",
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
          }}
          aria-modal="true"
          role="dialog"
          aria-labelledby="add-widget-title"
        >
          {/* Modal header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "#0047bb",
              padding: "16px 24px",
              borderTopLeftRadius: "8px",
              borderTopRightRadius: "8px",
              color: "white",
            }}
          >
            <h3 id="add-widget-title" style={{ margin: 0, fontWeight: "bold" }}>
              Add Widget
            </h3>
            <button
              onClick={closeModal}
              aria-label="Close Add Widget Modal"
              style={{
                fontWeight: "bold",
                fontSize: "24px",
                border: "none",
                background: "transparent",
                cursor: "pointer",
                color: "white",
              }}
            >
              ×
            </button>
          </div>

          {/* Tabs navigation */}
          <div
            style={{
              display: "flex",
              gap: "24px",
              margin: "20px 24px",
            }}
            role="tablist"
          >
            {["CSPM", "CWPP", "Image", "Ticket"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: "8px 16px",
                  border: "none",
                  borderBottom:
                    activeTab === tab ? "3px solid #0047bb" : "3px solid transparent",
                  background: "transparent",
                  cursor: "pointer",
                  fontWeight: activeTab === tab ? "700" : "400",
                  fontSize: "16px",
                  color: "#222",
                }}
                aria-selected={activeTab === tab}
                role="tab"
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Widget list per active tab */}
          <div
            style={{
              flexGrow: 1,
              overflowY: "auto",
              padding: "0 24px 24px 24px",
            }}
          >
            {filteredWidgets.length === 0 && (
              <p style={{ color: "#888", fontStyle: "italic" }}>No widgets found</p>
            )}
            {filteredWidgets.map((widget) => (
              <label
                key={widget.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "15px",
                  cursor: "pointer",
                  userSelect: "none",
                }}
              >
                <input
                  type="checkbox"
                  checked={selectedWidgets.includes(widget.id)}
                  onChange={() => toggleSelect(widget.id)}
                  style={{ marginRight: "12px", cursor: "pointer" }}
                />
                <span
                  style={{
                    fontWeight: selectedWidgets.includes(widget.id) ? "600" : "400",
                  }}
                >
                  {widget.name}
                </span>
              </label>
            ))}
          </div>

          {/* Modal footer buttons */}
          <div
            style={{
              marginTop: "auto",
              display: "flex",
              justifyContent: "flex-end",
              gap: "12px",
              padding: "0 24px 24px 24px",
            }}
          >
            <button
              onClick={closeModal}
              style={{
                padding: "10px 18px",
                borderRadius: "6px",
                borderColor: "#ccc",
                borderWidth: "1px",
                cursor: "pointer",
                background: "white",
                color: "#444",
                fontWeight: "600",
              }}
            >
              Cancel
            </button>
            <button
              onClick={confirmSelection}
              disabled={selectedWidgets.length === 0}
              style={{
                padding: "10px 18px",
                borderRadius: "6px",
                border: "none",
                cursor: selectedWidgets.length === 0 ? "not-allowed" : "pointer",
                backgroundColor: selectedWidgets.length === 0 ? "#ccc" : "#0047bb",
                color: "white",
                fontWeight: "bold",
              }}
            >
              Confirm
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Category;
