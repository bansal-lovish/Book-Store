//**React imports */
import React, { useEffect } from 'react'
 
//** MUI imports */
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide'
import { TransitionProps } from '@mui/material/transitions'
 

 
// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store'
import { getConfirmDialog } from '@/store/activity'

 

 
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />
})
 
//**Promise function */
 
const handleOpt = async (btn:any) => {
  const promise = new Promise((resolve, reject) => {
    if (btn === 'YES') {
      resolve(1)
    } else if (btn === 'NO') {
      reject(0)
    }
  })
 
  return promise
}
 
const Confirmdialog = () => {
  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
 
  const ui = useSelector((state: RootState) => state.activity.ui)

  const [openDialog, setOpenDialog] = React.useState(false)
 
  const id = ui.confirmationDialog.id
  const payload = ui.confirmationDialog.payload
 
  const handleConfirmation = async (e:any)  => {
    handleOpt(e.target.innerText)
      .then(() => {
       
        if(payload){
          dispatch(ui.confirmationDialog.action(payload))
          dispatch(getConfirmDialog({ confirmationDialog: { open: false, id, action: null ,message:'',payload:null} }))
        }else{
          dispatch(ui.confirmationDialog.action(id))
          dispatch(getConfirmDialog({ confirmationDialog: { open: false, id, action: null ,message:''} }))
        }
      })
      .catch(() => {
        dispatch(getConfirmDialog({ confirmationDialog: { open: false, id, action: null ,message:''} }))
      })
  }
 
  useEffect(() => {
    setOpenDialog(ui.confirmationDialog.open)
  }, [ui.confirmationDialog.open])
 
  return (

      <Dialog
        open={openDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleConfirmation}
        aria-describedby='alert-dialog-slide-description'
        sx={{zIndex:99999}}
      >
        <DialogTitle>{'Confirmation !'}</DialogTitle>
        <DialogContent sx={{ width: 500 }}>
          <DialogContentText id='alert-dialog-slide-description'>{ui.confirmationDialog.message??'Are you sure, want to Delete? ⚠️'}</DialogContentText>
         
       
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmation} size='small'>no</Button>
          <Button onClick={handleConfirmation} size='small'>yes</Button>
        </DialogActions>
      </Dialog>
    
  )
}
 
export default Confirmdialog