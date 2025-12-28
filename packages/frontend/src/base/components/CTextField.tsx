/**
 * CTextField
 * 
 * Base text field component with consistent styling
 */

import { FC } from 'react';
import { TextField, TextFieldProps } from '@mui/material';

export interface ICTextFieldProps extends TextFieldProps {
  // Add custom props here if needed
}

export const CTextField: FC<ICTextFieldProps> = (props) => {
  return (
    <TextField
      variant="outlined"
      fullWidth
      {...props}
    />
  );
};
