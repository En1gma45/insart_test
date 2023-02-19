import { IResponse } from './types';

export const ApiCall = async () => {
  if (localStorage.getItem('requestCounter') === null) {
    localStorage.setItem('requestCounter', `1`);
  }
  if (Number(localStorage.getItem('requestCounter')) >= 5) {
    localStorage.setItem('requestCounter', `1`);
    return new Error('External server error');
  }
  const response: IResponse[] = await fetch('p24api/pubinfo?exchange&coursid=5').then((data) =>
    data.json(),
  );

  localStorage.setItem('requestCounter', `${Number(localStorage.getItem('requestCounter')) + 1}`);
  return response;
};
