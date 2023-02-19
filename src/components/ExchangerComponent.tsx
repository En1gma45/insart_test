/* eslint-disable react-hooks/exhaustive-deps */
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import { IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import { ICurrency, IResponse } from '~/utils/types';
import CurrencyRow from './CurrencyRow';

interface IExchangerComponentProps {
  data: IResponse[];
}

export const ExchangerComponent = ({ data }: IExchangerComponentProps) => {
  const [currencyOptions] = useState([...data.map((item) => item.ccy), data[0].base_ccy]);
  const [fromCurrency, setFromCurrency] = useState(data[0].base_ccy);
  const [toCurrency, setToCurrency] = useState(data[0].ccy);
  const [exchangeRate, setExchangeRate] = useState(data[0].buy);
  const [amount, setAmount] = useState(0);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

  let toAmount, fromAmount;
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }

  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      setExchangeRate((prev) => {
        const currentRates = data.find(
          (item) => item.ccy === fromCurrency || item.ccy === toCurrency,
        );
        if (currentRates === undefined) return prev;
        if (fromCurrency === 'UAH') return currentRates.buy;
        if (toCurrency === 'UAH') return currentRates.sale;
      });
    }
  }, [fromCurrency, toCurrency]);

  const handleFromAmountChange = (e?: React.ChangeEvent<HTMLInputElement>, value?: number) => {
    if (e != undefined) setAmount(Number(e.target.value));
    if (value != undefined) setAmount(value);
    setAmountInFromCurrency(true);
  };

  const handleToAmountChange = (e?: React.ChangeEvent<HTMLInputElement>, value?: number) => {
    if (e != undefined) setAmount(Number(e.target.value));
    if (value != undefined) setAmount(value);
    setAmountInFromCurrency(false);
  };
  const handleSwapCurrency = () => {
    const from = fromCurrency;
    const to = toCurrency;
    setFromCurrency(to);
    setToCurrency(from);
    setExchangeRate((prev) => {
      const currentRates = data.find((item) => {
        return item.ccy === from || item.ccy === to;
      });
      if (currentRates === undefined) return prev;
      if (from === 'UAH') return currentRates?.buy;
      if (to === 'UAH') return currentRates?.sale;
    });
  };

  return (
    <>
      <div className="w-[calc(100vw-48px)] min-w-fit flex flex-row items-center justify-evenly mt-32">
        <CurrencyRow
          label="Change"
          currencyOptions={
            fromCurrency === 'UAH' ? ['UAH'] : currencyOptions.filter((item) => item != toCurrency)
          }
          selectedCurrency={fromCurrency}
          onChangeCurrency={(e) => setFromCurrency(e.target.value as ICurrency)}
          onChangeAmount={handleFromAmountChange}
          amount={fromAmount}
        />
        <IconButton onClick={() => handleSwapCurrency()}>
          <SyncAltIcon />
        </IconButton>
        <CurrencyRow
          label="Get"
          currencyOptions={
            toCurrency === 'UAH' ? ['UAH'] : currencyOptions.filter((item) => item != fromCurrency)
          }
          selectedCurrency={toCurrency}
          onChangeCurrency={(e) => setToCurrency(e.target.value as ICurrency)}
          onChangeAmount={handleToAmountChange}
          amount={toAmount}
        />
      </div>
    </>
  );
};
