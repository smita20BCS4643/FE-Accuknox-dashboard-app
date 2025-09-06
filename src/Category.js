import React from 'react';
import Widget from './Widget';

function Category({ category }) {
  return (
    <div>
      <h2>{category.name}</h2>
      <div>
        {category.widgets.map(widget => (
          <Widget key={widget.id} widget={widget} />
        ))}
      </div>
    </div>
  );
}

export default Category;
