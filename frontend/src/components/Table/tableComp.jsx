import React from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    fontSize: 12,
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.8px',
    padding: '12px 16px',
    whiteSpace: 'nowrap',
    borderBottom: 'none',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 13,
    padding: '12px 16px',
    color: '#2d3748',
    fontWeight: 500,
    borderBottom: '1px solid #edf2f7',
    whiteSpace: 'nowrap',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#fafbfc',
  },
  '&:nth-of-type(even)': {
    backgroundColor: '#fff',
  },
  '&:hover': {
    backgroundColor: '#e8f4f8 !important',
    transform: 'translateX(4px)',
    boxShadow: '0 4px 12px rgba(37, 86, 116, 0.1)',
  },
  '&:last-child td': {
    border: 0,
  },
  transition: 'all 0.25s ease',
}));

// Column config: define alignment and width per index
const colStyle = (index, totalCols) => {
  if (index === 0) {
    // Sr No. — centered, narrow, styled bg
    return {
      textAlign: 'center',
      width: 80,
      fontWeight: 700,
      color: '#255674',
      background: 'linear-gradient(135deg, #e8f4f8 0%, #d1e7f0 100%)',
      borderRight: '2px solid #d1e7f0',
    };
  }
  if (index === totalCols - 2) {
    // Quantity — centered
    return {
      textAlign: 'center',
      fontWeight: 700,
      color: '#255674',
      minWidth: 100,
    };
  }
  if (index === totalCols - 1) {
    // Usage (last col) — centered
    return {
      textAlign: 'center',
      fontWeight: 600,
      color: '#48bb78',
      minWidth: 100,
    };
  }
  // Name or middle columns — left aligned, flex grow
  return {
    textAlign: 'left',
    fontWeight: 600,
    color: '#1a2332',
    flex: 1,
  };
};

const headerStyle = (index, totalCols) => {
  if (index === 0) return { textAlign: 'center', width: 80 };
  if (index === totalCols - 2) return { textAlign: 'center', minWidth: 100 };
  if (index === totalCols - 1) return { textAlign: 'center', minWidth: 100 };
  return { textAlign: 'left' };
};

const TableComp = (props) => {
  const totalCols = props.header.length;

  return (
    <TableContainer
      component={Paper}
      sx={{
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
        border: '1px solid #e0e6ed',
      }}
    >
      <Table sx={{ minWidth: 500, tableLayout: 'fixed' }} aria-label="stock table">
        <TableHead>
          <TableRow>
            {props.header.map((item, index) => (
              <StyledTableCell
                key={index}
                sx={{
                  ...headerStyle(index, totalCols),
                  ...(index === 0 && {
                    borderTopLeftRadius: '12px',
                    borderBottomLeftRadius: '0px',
                  }),
                  ...(index === totalCols - 1 && {
                    borderTopRightRadius: '12px',
                    borderBottomRightRadius: '0px',
                  }),
                }}
              >
                {item}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {props.data.map((item, index) => (
            <StyledTableRow key={index}>
              {Object.keys(item).map((key, ind) => (
                <StyledTableCell
                  key={ind}
                  sx={colStyle(ind, totalCols)}
                >
                  {item[key]}
                </StyledTableCell>
              ))}
            </StyledTableRow>
          ))}

          {props.data.length === 0 && (
            <StyledTableRow>
              <StyledTableCell
                colSpan={totalCols}
                sx={{
                  textAlign: 'center',
                  padding: '48px 20px',
                  color: '#718096',
                  fontStyle: 'italic',
                  fontSize: '15px !important',
                  fontWeight: '600 !important',
                  background: '#fafbfc',
                }}
              >
                🔍 No data found
              </StyledTableCell>
            </StyledTableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TableComp