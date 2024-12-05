import { useDraggable } from '@dnd-kit/core';

export interface DraggableItemProps {
  id: string;
  type: string;
  content: string;
}

const DraggableItem = ({ id, type, content }: DraggableItemProps) => {
  const { attributes, listeners, setNodeRef, isDragging, transform } = useDraggable({
    id,
    data: { type },
  });

  // Style to simulate the "grabbed" effect and move with the cursor
  const style: React.CSSProperties = {
    border: '1px solid #ccc',
    padding: '8px',
    margin: '4px',
    cursor: 'grab', // This gives the "grab" cursor
    backgroundColor: '#f7f7f7',
    borderRadius: '4px',
    opacity: isDragging ? 0.6 : 1, // Reduce opacity when dragged
    transform: isDragging
      ? `translate3d(${transform?.x}px, ${transform?.y}px, 0)` // Move the item with cursor
      : 'none',
    transition: 'transform 0.1s ease, opacity 0.1s ease', // Smooth transitions for the dragged item
  };

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
    >
      {content}
    </div>
  );
};

export default DraggableItem;
