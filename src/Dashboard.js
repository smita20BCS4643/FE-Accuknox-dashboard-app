import React, { useState } from 'react';
import Category from './Category';
import NavBar from './NavBar';
import DashboardHeader from './DashboardHeader';

const initialData = {
  categories: [
    {
      id: 'cspm',
      name: 'CSPM Executive Dashboard',
      widgets: [
        { id: 'widget1', name: 'Cloud Accounts', text: 'Random text for Cloud Accounts' },
        { id: 'widget2', name: 'Cloud Account Risk Assessment', text: 'Random text for Risk Assessment' },
      ],
    },
    {
      id: 'cwpp',
      name: 'CWPP Dashboard',
      widgets: [
        { id: 'widget3', name: 'Workload Alerts', text: 'Random text for Workload Alerts' },
      ],
    },
    // Add other categories as needed
  ],
};

function Dashboard() {
  const [data, setData] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState('');
  const [notifications, setNotifications] = useState([]);

  // Track category ID for modal opened from top Add Widget button
  const [modalCategoryId, setModalCategoryId] = useState(null);

  // Add notification message
  const addNotification = (msg) => {
    setNotifications(prev => [...prev, msg]);
    setTimeout(() => {
      setNotifications(prev => prev.slice(1));
    }, 4000);
  };

  // Add widget to a category
  const addWidget = (categoryId, widget) => {
    setData(prevData => {
      const newCategories = prevData.categories.map(cat =>
        cat.id === categoryId ? { ...cat, widgets: [...cat.widgets, widget] } : cat
      );
      return { categories: newCategories };
    });
    addNotification(`Widget "${widget.name}" added.`);
  };

  // Remove widget from a category
  const removeWidget = (categoryId, widgetId) => {
    setData(prevData => {
      const newCategories = prevData.categories.map(cat =>
        cat.id === categoryId ? { ...cat, widgets: cat.widgets.filter(w => w.id !== widgetId) } : cat
      );
      return { categories: newCategories };
    });
    addNotification(`Widget removed.`);
  };

  // Handler to open modal from top Add Widget button
  const openAddWidgetModal = (categoryId) => {
    setModalCategoryId(categoryId);
  };

  // Close modal by resetting modalCategoryId
  const closeAddWidgetModal = () => {
    setModalCategoryId(null);
  };

  // Find the category for the modal or null if none open
  const modalCategory =
    data?.categories?.find((cat) => cat.id === modalCategoryId) || null;

  // Filter categories and widgets based on searchTerm
  const filteredCategories = data.categories.map(category => {
    const filteredWidgets = category.widgets.filter(widget =>
      widget.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return {
      ...category,
      widgets: filteredWidgets,
    };
  }).filter(category =>
    category.widgets.length > 0 || category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <NavBar
        searchTerm={searchTerm}
        onSearchChange={(e) => setSearchTerm(e.target.value)}
        notifications={notifications}
      />

      <div style={{ padding: '20px' }}>
        <DashboardHeader
          onAddWidgetClick={() => openAddWidgetModal('cspm')}
          onRefreshClick={() => alert("Dashboard refreshed!")}
          onMoreOptionSelect={(option) => alert(`Selected option: ${option}`)}
          timeRange={"Last 2 days"}
          onTimeRangeChange={(newRange) => alert(`Time range changed to ${newRange}`)}
        />

        {filteredCategories.map(category => (
          <Category
            key={category.id}
            category={category}
            onAddWidget={addWidget}
            onRemoveWidget={removeWidget}
          />
        ))}

        {modalCategory && (
          <Category
            category={modalCategory}
            onAddWidget={(id, widget) => {
              addWidget(id, widget);
              closeAddWidgetModal();
            }}
            onRemoveWidget={removeWidget}
            showModal={true}
            onCloseModal={closeAddWidgetModal}
          />
        )}
      </div>
    </div>
  );
}

export default Dashboard;
