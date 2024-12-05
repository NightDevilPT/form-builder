// components/SortableItem.tsx
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface SortableItemProps {
  id: string;
  type: string;
  content: string;
  children: React.ReactNode; // Allow children to be passed in dynamically
}

const SortableItem = ({ id, type, content, children }: SortableItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    border: "1px solid #ccc",
    padding: "8px",
    borderRadius: "4px",
    backgroundColor: "#f7f7f7",
    cursor: "move",
  };

  return (
    <div ref={setNodeRef} {...listeners} {...attributes} style={style}>
      <h4>{content}</h4> {/* Display the item label */}
      {children} {/* Render the component dynamically here */}
    </div>
  );
};

export default SortableItem;
