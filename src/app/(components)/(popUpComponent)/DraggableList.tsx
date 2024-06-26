import { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DraggableItem from './DraggableItem';

const DraggableList = () => {
  const [items, setItems] = useState<string[]>(['item 1']);

  const moveItem = (dragIndex: number, hoverIndex: number) => {
    const newItems = [...items];
    const [removed] = newItems.splice(dragIndex, 1);
    newItems.splice(hoverIndex, 0, removed);
    setItems(newItems);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col bg-white">
        {items.map((item, index) => (
          <DraggableItem
            key={index}
            name={item}
            index={index}
            moveItem={moveItem}
          />
        ))}
      </div>
    </DndProvider>
  );
};

export default DraggableList;
