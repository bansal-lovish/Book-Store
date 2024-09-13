import React from 'react'
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


function getStyles(name: string, personName: string[], theme: Theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  interface SelectFilterDropDownProps{
    options:any[],
    idkey: string;
    valuekey: string;
    multiselect?:boolean
    onChange?:any
    value:string,
    noneMenuItem?:boolean
    label:string
  }
const SelectFilterDropDown = ({options,valuekey,idkey,multiselect,onChange,value,noneMenuItem,label}:SelectFilterDropDownProps) => {


    const theme = useTheme();
    const [personName, setPersonName] = React.useState<string[]>([]);
  
    const handleChange = (event: SelectChangeEvent<typeof personName>) => {
      const {
        target: { value },
      } = event;
      setPersonName(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
      );
    };
  
    return (
      <div>
        {multiselect ? (      <FormControl sx={{width: 300 }}>
          <InputLabel id="demo-multiple-name-label">{label}</InputLabel>
          <Select
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            multiple
            value={value}
            onChange={onChange}
            input={<OutlinedInput label={label} />}
            MenuProps={MenuProps}
            size='small'
          >
            {options.map((item:any) => (
              <MenuItem
                key={item[idkey]}
                value={item[idkey]}
                style={getStyles(item[idkey], personName, theme)}
              >
                {item[valuekey]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>):(
                  <FormControl sx={{width: 300 }}  >
                  <InputLabel id="demo-multiple-name-label">{label}</InputLabel>
                  <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                 size='small'
                    value={value}
                    onChange={onChange}
                    input={<OutlinedInput label={label} />}
                    MenuProps={MenuProps}
                    placeholder='select category'
                  >
                    {noneMenuItem && (  <MenuItem
                       
                        value={undefined}
                        // style={getStyles(, personName, theme)}
                      >
                        None
                      </MenuItem>)}
                    {options.map((item:any) => (
                      <MenuItem
                        key={item[idkey]}
                        value={item[idkey]}
                        style={getStyles(item[idkey], personName, theme)}
                      >
                        {item[valuekey]}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
        )}
  
      </div>
    );
}

export default SelectFilterDropDown