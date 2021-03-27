import React, { useEffect } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

export default function RadioButtonsGroup(props: any) {
  const [value, setValue] = React.useState(props.value);
  useEffect(() => {
    props.changeValue(value);
  }, [value])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);

  };

  return (
    <FormControl disabled={props.disabled} component="fieldset">
      <FormLabel component="legend">Gênero</FormLabel>
      <RadioGroup aria-label="genero" name="gender1" value={value} onChange={handleChange}>
        <FormControlLabel value="feminino" control={<Radio color="secondary" />} label="feminino" />
        <FormControlLabel value="masculino" control={<Radio color="default" />} label="masculino" />
        <FormControlLabel value="outro" control={<Radio color="primary" />} label="outro" />
      </RadioGroup>
    </FormControl>
  );
}
