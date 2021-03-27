import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Radio from '@material-ui/core/Radio';

const GreenRadio = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

export default function RadioButtonCriarAlterar(props) {
  const [selectedValue, setSelectedValue] = React.useState('criar');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    props.changeRadio(event);
  };

  return (
    <div>
      <GreenRadio
        checked={selectedValue === 'criar'}
        onChange={handleChange}
        value="criar"
        name="radio-button-demo"
        inputProps={{ 'aria-label': 'C' }}
        size="small"
      />
      Criar
      <Radio
        checked={selectedValue === 'editar'}
        onChange={handleChange}
        value="editar"
        color="default"
        name="radio-button-demo"
        inputProps={{ 'aria-label': 'E' }}
        size="small"
      />
      Editar
      <Radio
        checked={selectedValue === 'excluir'}
        onChange={handleChange}
        value="excluir"
        name="radio-button-demo"
        inputProps={{ 'aria-label': 'A' }}
        size="small"
      />
      Excluir
    </div>
  );
}
