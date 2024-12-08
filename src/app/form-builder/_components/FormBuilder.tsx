'use client';

import { DndContext } from '@dnd-kit/core';
import React, { useState } from 'react';
import { PiSunBold, PiMoonStarsBold } from 'react-icons/pi';
import { FormElementsProvider } from './design-context';
import DesignMode from './design-mode';

const FormBuilder = () => {
  const [theme, setTheme] = useState<boolean>(false);

  return (
    <DndContext>
      <FormElementsProvider>
        <div className="w-full h-full grid grid-rows-[80px,1fr]">
          <div className="w-full flex justify-between items-center px-5 border-b border-gray-800">
            <h1 className="text-xl text-white">Project 1</h1>
            <div className="flex items-center gap-1 relative">
              <button className={`w-7 h-7 p-1 ${theme ? 'text-white' : 'text-gray-700'}`} onClick={() => setTheme(true)}>
                <PiSunBold />
              </button>
              <button className={`w-7 h-7 p-1 ${theme ? 'text-gray-700' : 'text-white'}`} onClick={() => setTheme(false)}>
                <PiMoonStarsBold />
              </button>
            </div>
          </div>
          <DesignMode />
        </div>
      </FormElementsProvider>
    </DndContext>
  );
};

export default FormBuilder;
