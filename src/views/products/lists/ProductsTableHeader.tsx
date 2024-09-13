import SelectFilterDropDown from '@/components/formcomponents/filter/SelectFilterDropdown';

import { Box, Button } from '@mui/material'
import React from 'react'
interface TableHeaderProps {
  handleFilter: (val: string | number) => void;
  category: string;
  toggle:any
  
}
const ProductsTableHeader = (props:TableHeaderProps) => {
  const{category,handleFilter,toggle}=props
  const onChange=(e:any)=>{
    handleFilter(e.target.value)

  }
  return (
<Box sx={{display:'flex',alignItems:'center',flexDirection:'row',justifyContent:'space-between'}}>
    <Box sx={{display:'flex',justifyContent:'flex-start',alignItems:'center'}}>
    <SelectFilterDropDown
          label="Category"
          options={[
            { id: "Fiction", value: "Fiction" },
            { id: "Non-Fiction", value: "Non-Fiction" },
            { id: "Young Adult (YA)", value: "Young Adult (YA)" },
            { id: "Children’s Books", value: "Children’s Books" },
            { id: "Graphic Novels", value: "Graphic Novels" },
            { id: "Classics", value: "Classics" },
            { id: "Historical Romance", value: "Historical Romance" },
            { id: "LGBTQ+ Fiction", value: "LGBTQ+ Fiction" },
            { id: "Inspirational/Religious Fiction", value: "Inspirational/Religious Fiction", },
            { id: "Short Stories/Novellas", value: "Short Stories/Novellas", },
          ]}
          idkey={"id"}
          valuekey={"value"}
          onChange={onChange}
           value={category}
          noneMenuItem={true}                   />
    </Box>
 <Box sx={{display:'flex',justifyContent:'flex-end',alignItems:'center'}}>
<Button variant='contained' sx={{backgroundColor:'#405D72'}} onClick={toggle}>Add Product</Button>
 </Box>
</Box>
  )
}

export default ProductsTableHeader