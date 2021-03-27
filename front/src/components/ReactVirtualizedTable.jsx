import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';
import { AutoSizer, Column, Table } from 'react-virtualized';


const styles = (theme) => ({
  flexContainer: {
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
  },
  table: {
    '& .ReactVirtualized__Table__headerRow': {
      flip: false,
      paddingRight: theme.direction === 'rtl' ? '0 !important' : undefined,
    },
  },
  tableRow: {
    cursor: 'pointer',
  },
  tableRowHover: {
    '&:hover': {
      backgroundColor: theme.palette.grey[200],
    },
  },
  tableCell: {
    flex: 1,
  },
  noClick: {
    cursor: 'initial',
  },
});

class MuiVirtualizedTable extends React.PureComponent {
  static defaultProps = {
    headerHeight: 48,
    rowHeight: 48,
  };

  getRowClassName = ({ index }) => {
    const { classes, onRowClick } = this.props;

    return clsx(classes.tableRow, classes.flexContainer, {
      [classes.tableRowHover]: index !== -1 && onRowClick != null,
    });
  };

  cellRenderer = ({ cellData, columnIndex }) => {
    const { columns, classes, rowHeight, onRowClick } = this.props;
    return (
      <TableCell
        component="div"
        className={clsx(classes.tableCell, classes.flexContainer, {
          [classes.noClick]: onRowClick == null,
        })}
        variant="body"
        style={{ height: rowHeight }}
        align={(columnIndex != null && columns[columnIndex].numeric) || false ? 'right' : 'left'}
      >
        {cellData}
      </TableCell>
    );
  };

  headerRenderer = ({ label, columnIndex }) => {
    const { headerHeight, columns, classes } = this.props;

    return (
      <TableCell
        component="div"
        className={clsx(classes.tableCell, classes.flexContainer, classes.noClick)}
        variant="head"
        style={{ height: headerHeight }}
        align={columns[columnIndex].numeric || false ? 'right' : 'left'}
      >
        <span>{label}</span>
      </TableCell>
    );
  };

  render() {
    const { classes, columns, rowHeight, headerHeight, ...tableProps } = this.props;
    return (
      <AutoSizer>
        {({ height, width }) => (
          <Table
            height={height}
            width={width}
            rowHeight={rowHeight}
            gridStyle={{
              direction: 'inherit',
            }}
            headerHeight={headerHeight}
            className={classes.table}
            {...tableProps}
            rowClassName={this.getRowClassName}
          >
            {columns.map(({ dataKey, ...other }, index) => {
              return (
                <Column
                  key={dataKey}
                  headerRenderer={(headerProps) =>
                    this.headerRenderer({
                      ...headerProps,
                      columnIndex: index,
                    })
                  }
                  className={classes.flexContainer}
                  cellRenderer={this.cellRenderer}
                  dataKey={dataKey}
                  {...other}
                />
              );
            })}
          </Table>
        )}
      </AutoSizer>
    );
  }
}

MuiVirtualizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      dataKey: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      numeric: PropTypes.bool,
      width: PropTypes.number.isRequired,
    }),
  ).isRequired,
  headerHeight: PropTypes.number,
  onRowClick: PropTypes.func,
  rowHeight: PropTypes.number,
};

const VirtualizedTable = withStyles(styles)(MuiVirtualizedTable);




export default function ReactVirtualizedTable(props) {
  const [regs, setRegs] = useState([]);
  
  useEffect(() => {
    let result = [];
    let registros = [];
    let numberOfRegisters = 0;
    function carregarRegistros () {
      fetch('http://localhost:8080/pessoa/', {
        method: 'GET'
      })
        .then(response => response.json())
        .then(data => {
          for (let i in data) {
            result.push(Object.values(data[i]));
          }
          numberOfRegisters = result.length;
        })
        .then(() => {
          function createData(nome, sexo, email, nascimento, naturalidade, nacionalidade, cpf, id) {
  
            return { nome, sexo, email, nascimento: dateToString(nascimento), naturalidade, nacionalidade, cpf, id };
          }
    
          for (let i = 0; i < numberOfRegisters; i += 1) {
            const selection = result[i];
            registros.push(createData(...selection));
          }
          setRegs(registros);
          props.preencherDados(registros);
        }).then(() => {})
        .catch(function (err) {
          console.error(err);
        });
        return registros;
    }
  
    carregarRegistros();
  },[])

  function dateToString (date) {
    return date.toString().substring(8,10) + "/" + date.toString().substring(5,7) + "/" + date.toString().substring(0,4);
  } 

  return (
    <Paper style={{ height: '100%', width: '100%' }}>
      <VirtualizedTable
        rowCount={regs?.length}
        rowGetter={({ index }) => regs[index]}
        columns={[
          {
            width: 60,
            label: 'ID',
            dataKey: 'id',
          },
          {
            width: 300,
            label: 'Nome',
            dataKey: 'nome',
          },
          {
            width: 90,
            label: 'Sexo',
            dataKey: 'sexo',
          },
          {
            width: 250,
            label: 'Email',
            dataKey: 'email',
          },
          {
            width: 110,
            label: 'Nascimento',
            dataKey: 'nascimento',
          },
          {
            width: 140,
            label: 'Naturalidade',
            dataKey: 'naturalidade',
          },
          {
            width: 160,
            label: 'Nacionalidade',
            dataKey: 'nacionalidade',
          },
          {
            width: 140,
            label: 'CPF',
            dataKey: 'cpf',
          },
          
        ]}
      />
    </Paper>
  );
}
