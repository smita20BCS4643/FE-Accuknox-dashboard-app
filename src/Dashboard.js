import React, { useState } from 'react';
import Category from './Category';

const initialData = {
  categories: [
    {
      id: 'cspm',
      name: 'CSPM Executive Dashboard',
      widgets: [
        { id: 'widget1', name: 'Cloud Account Risk Assessment', text: 'Random text for Cloud Account Risk Assessment.' },
        { id: 'widget2', name: 'Top 5 Namespace Specific Alerts', text: 'Random text for alerts.' },
      ],
    },
    {
      id: 'cwpp',
      name: 'CWPP Dashboard',
      widgets: [
        { id: 'widget3', name: 'Image Risk Assessment', text: 'Random text for Image Risk Assessment.' },
        { id: 'widget4', name: 'Workload Alerts', text: 'Random text for Workload Alerts.' },
      ],
    },
  ],
};

function Dashboard() {
  const [data, setData] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter widgets based on search term
  const filteredCategories = data.categories.map(category => {
    const filteredWidgets = category.widgets.filter(widget =>
      widget.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      widget.text.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return { ...category, widgets: filteredWidgets };
  });

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      {/* Breadcrumb */}
      <div style={{ marginBottom: '15px', fontSize: '14px', color: '#666' }}>
        Home &gt; Dashboard V2
      </div>

      {/* Search Box */}
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search anything..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{ padding: '8px', width: '300px', fontSize: '16px' }}
        />
      </div>

      {/* Categories */}
      {filteredCategories.map(category => (
        <Category key={category.id} category={category} />
      ))}
    </div>
  );
}

export default Dashboard;
