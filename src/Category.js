import React, { useState } from 'react';
import Widget from './Widget';

function Category({ category, onAddWidget, onRemoveWidget }) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newWidgetName, setNewWidgetName] = useState('');
  const [newWidgetText, setNewWidgetText] = useState('');

  const handleAddWidget = () => {
    if (!newWidgetName.trim()) return;
    const newWidget = {
      id: `widget-${Date.now()}`, // unique id
      name: newWidgetName,
      text: newWidgetText || 'Random text',
    };
    onAddWidget(category.id, newWidget);
    setNewWidgetName('');
    setNewWidgetText('');
    setShowAddForm(false);
  };

  return (
    <div style={{ marginBottom: '30px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
        <h2>{category.name}</h2>
        <button onClick={() => setShowAddForm(!showAddForm)} style={{ padding: '6px 12px', cursor: 'pointer' }}>
          + Add Widget
        </button>
      </div>

      {showAddForm && (
        <div style={{ marginBottom: '15px', border: '1px solid #ccc', padding: '10px', borderRadius: '4px' }}>
          <input
            type="text"
            placeholder="Widget Name"
            value={newWidgetName}
            onChange={e => setNewWidgetName(e.target.value)}
            style={{ marginRight: '10px', padding: '6px', width: '200px' }}
          />
          <input
            type="text"
            placeholder="Widget Text"
            value={newWidgetText}
            onChange={e => setNewWidgetText(e.target.value)}
            style={{ marginRight: '10px', padding: '6px', width: '300px' }}
          />
          <button onClick={handleAddWidget} style={{ padding: '6px 12px', cursor: 'pointer' }}>
            Add
          </button>
        </div>
      )}

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
        {category.widgets.map(widget => (
          <Widget
            key={widget.id}
            widget={widget}
            categoryId={category.id}
            onRemoveWidget={onRemoveWidget}
          />
        ))}
      </div>
    </div>
  );
}

export default Category;
