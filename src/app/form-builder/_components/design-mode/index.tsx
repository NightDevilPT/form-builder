import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import SideBarButtons from '../sidebar-elements';
import { useFormElements } from '../design-context';
import RootFormDesignElement from '../form-design-elements/RootFormDesignElement';
import DragOverlayWrapper from '../drag-overlay/DragOverlay';

const DesignMode = () => {
  const { formElements } = useFormElements();
  const dropArea = useDroppable({
    id: 'designer-drop-area',
    data: { isDesignerDropArea: true },
  });

  return (
    <div className="w-full h-full grid grid-cols-[1fr,300px] gap-3 bg-slate-900">
      <div className="w-full h-full overflow-y-auto p-5 flex justify-center items-center">
        <div
          ref={dropArea.setNodeRef}
          className={`w-4/5 h-full p-5 rounded-md bg-slate-950 ${dropArea.isOver ? 'ring-2 ring-primary' : ''}`}
        >
          {Object.keys(formElements).length === 0 && !dropArea.isOver && (
            <span className="text-white">Drop the element</span>
          )}
		  {dropArea.isOver && <div className='w-full p-1'><div className='w-full h-[120px] rounded-md bg-primary/10'></div></div>}
          {Object.keys(formElements).map((key) => (
            <RootFormDesignElement key={key} type={formElements[key].type} />
          ))}
        </div>
      </div>
      <div className="w-full h-full overflow-y-auto py-4 bg-slate-950">
        <SideBarButtons />
      </div>
	  <DragOverlayWrapper />
    </div>
  );
};

export default DesignMode;
