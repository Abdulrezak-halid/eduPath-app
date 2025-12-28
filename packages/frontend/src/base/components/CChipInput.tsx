/**
 * CChipInput
 * 
 * Base component for inputting multiple values as chips (e.g., tags)
 */

import { FC, useState, KeyboardEvent } from 'react';
import { Box, Chip, TextField, Stack } from '@mui/material';

export interface ICChipInputProps {
  label?: string;
  value: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  maxItems?: number;
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
}

export const CChipInput: FC<ICChipInputProps> = ({
  label,
  value,
  onChange,
  placeholder = 'Type and press Enter',
  maxItems = 10,
  error = false,
  helperText,
  disabled = false,
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' && inputValue.trim()) {
      event.preventDefault();
      
      if (value.length >= maxItems) {
        return;
      }

      const newValue = inputValue.trim().toLowerCase();
      
      if (!value.includes(newValue)) {
        onChange([...value, newValue]);
      }
      
      setInputValue('');
    }
  };

  const handleDelete = (chipToDelete: string) => {
    onChange(value.filter((chip) => chip !== chipToDelete));
  };

  return (
    <Box>
      <TextField
        fullWidth
        label={label}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        error={error}
        helperText={helperText || `${value.length}/${maxItems} tags`}
        disabled={disabled || value.length >= maxItems}
      />
      {value.length > 0 && (
        <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mt: 1, gap: 1 }}>
          {value.map((chip) => (
            <Chip
              key={chip}
              label={chip}
              onDelete={() => handleDelete(chip)}
              size="small"
              disabled={disabled}
            />
          ))}
        </Stack>
      )}
    </Box>
  );
};
