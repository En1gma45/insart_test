import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { IResponse } from '~/utils/types';

interface ITableProps {
  data: IResponse[];
}

export const TableComponent = ({ data }: ITableProps) => {
  return (
    <TableContainer sx={{ minWidth: 650, maxWidth: 1500 }}>
      <Table sx={{ minWidth: 650, maxWidth: 1500 }} aria-label="simple table">
        <TableHead>
          <TableRow sx={{ minWidth: 650 }}>
            <TableCell>Currency</TableCell>
            <TableCell align="center">Buy</TableCell>
            <TableCell align="center">Sell</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => {
            return (
              <TableRow key={item.ccy} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {`${item.ccy}/${item.base_ccy}`}
                </TableCell>
                <TableCell align="center">{item.buy}</TableCell>
                <TableCell align="center">{item.sale}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
