import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import clsx from 'clsx';

export const Header = () => {
  return (
    <header className="sticky top-0 w-full">
      <div className="bg-gray-600 shadow-lg">
        <ul className="flex items-center mx-4">
          <CurrencyExchangeIcon color="error" fontSize="large" />
          <p className={clsx('relative flex items-center h-12 ml-4 px-1', 'text-slate-200')}>
            Exchange App
          </p>
        </ul>
      </div>
    </header>
  );
};
