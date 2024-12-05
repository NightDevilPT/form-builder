// components/DroppableArea.tsx

import { useDroppable } from '@dnd-kit/core';

interface DroppableAreaProps {
  id: string;
  children: React.ReactNode; // To accept children components (dropped items)
}

const DroppableArea = ({ id, children }: DroppableAreaProps) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      style={{
        border: '2px dashed #888',
        padding: '16px',
        minHeight: '200px',
        marginTop: '20px',
        marginBottom: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <h3>Drop Items Here</h3>
      {children} {/* Render the dropped components as children */}
    </div>
  );
};

export default DroppableArea;
