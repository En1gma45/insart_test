import ClearIcon from '@mui/icons-material/Clear';
import { IconButton, InputAdornment, Paper, TextField } from '@mui/material';
import React, { useRef, useState } from 'react';
import { ICurrency } from '~/utils/types';

interface ICurrencyRowProps {
  label: string;
  currencyOptions: string[];
  selectedCurrency: ICurrency;
  onChangeCurrency: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onChangeAmount: (e?: React.ChangeEvent<HTMLInputElement>, value?: number) => void;
  amount: number;
}

export default function CurrencyRow(props: ICurrencyRowProps) {
  const { currencyOptions, selectedCurrency, onChangeCurrency, onChangeAmount, amount, label } =
    props;
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setFocus] = useState<boolean>(false);
  const handleClear = () => {
    if (inputRef != null && inputRef.current != null) {
      inputRef.current.value = '0';
      onChangeAmount(undefined, 0);
    }
  };
  return (
    <Paper
      component="form"
      sx={{
        p: '5px 10px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 400,
      }}
    >
      <TextField
        inputRef={inputRef}
        onFocus={() => setFocus(true)}
        onBlur={() => setTimeout(() => setFocus(false), 500)}
        id="standard-basic"
        label={label}
        variant="standard"
        value={amount}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeAmount(e)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton sx={{ width: 50 }} onClick={() => handleClear()}>
                <ClearIcon
                  sx={isFocused ? {} : { display: 'none', transition: 'all 1s ease-out;' }}
                />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <select value={selectedCurrency} onChange={onChangeCurrency}>
        {currencyOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </Paper>
  );
}
