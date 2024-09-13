import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import InventoryIcon from '@mui/icons-material/Inventory';
import SettingsIcon from '@mui/icons-material/Settings';
const Navigation = () => {
  return [
    {
        title:'Home',
        icon:<HomeIcon/>,
        path:'/home'
    },
    {
        title:'Products',
        icon:<InventoryIcon/>,
        path:'/products'
    },
    {
        title:'Settings',
        icon:<SettingsIcon/>,
        path:'/settings'
    }
  ]
}

export default Navigation