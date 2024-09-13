import { useAuth } from '@/context/AuthProvider'
import { AppDispatch, RootState } from '@/store'
import { uiProductUpdate } from '@/store/products'
import { Avatar, Box, Card, CardActions, CardContent, CardHeader, CardMedia, Dialog, Divider, IconButton, Typography } from '@mui/material'
import { red } from '@mui/material/colors'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const ProductsViewPage = ({open}:any) => {
  const dispatch=useDispatch<AppDispatch>()
  const handleClose=()=>{
    dispatch(uiProductUpdate({viewProduct:{open:false}}))
  }
  const auth=useAuth()
 
  const {product}=useSelector((state:RootState)=>state.products)
  console.log('product: ', product);
  return (
    <Dialog
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box sx={{Width:'100%'}}>
     <Card sx={{ maxWidth: 345 }}>
     <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {auth[0]?.fullname.slice(0,1)}
          </Avatar>
        }
        // action={
        //   <IconButton aria-label="settings">
        //     <MoreVertIcon />
        //   </IconButton>
        // }
        title={product.title}
        // subheader="September 14, 2016"
      />
           <CardMedia
        component="img"
        height="150"

      sx={{maxHeight:'200px'}}
        image={product?.image}
        alt={product.title}
      />
        <CardContent>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
       {product?.description}
        </Typography>
        <Divider/>
        <Box sx={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
       {product?.category}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
       ${product?.price}
        </Typography>
        </Box>
      </CardContent>
    </Card>
    </Box>
    </Dialog>
  )
}

export default ProductsViewPage