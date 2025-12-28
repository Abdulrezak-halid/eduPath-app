/**
 * CSelect
 * 
 * Base select/dropdown component with consistent styling
 */

import { FC, ReactNode } from 'react';
import { TextField, TextFieldProps, MenuItem } from '@mui/material';

export interface ICSelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface ICSelectProps extends Omit<TextFieldProps, 'select'> {
  options: ICSelectOption[];
  emptyLabel?: string;
  startAdornment?: ReactNode;
}

export const CSelect: FC<ICSelectProps> = ({
  options,
  emptyLabel,
  startAdornment,
  ...props
}) => {
  return (
    <TextField
      select
      fullWidth
      variant="outlined"
      InputProps={{
        startAdornment,
      }}
      {...props}
    >
      {emptyLabel && (
        <MenuItem value="">
          <em>{emptyLabel}</em>
        </MenuItem>
      )}
      {options.map((option) => (
        <MenuItem
          key={option.value}
          value={option.value}
          disabled={option.disabled}
        >
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
};
