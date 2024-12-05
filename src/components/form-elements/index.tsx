// lib/components.ts

import { Checkbox } from "./Checkbox";
import { TextField } from "./Input";


export const ItemComponent = ({ type, content }: { type: string; content: string }) => {
  switch (type) {
    case 'TextField':
      return <TextField label={content} />;
    case 'Checkbox':
      return <Checkbox label={content} />;
    default:
      return null;
  }
};
