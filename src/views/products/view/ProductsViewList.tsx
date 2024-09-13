import { AppDispatch, RootState } from "@/store";
import {
  deleteProduct,
  getAllProducts,
  getProduct,
  uiProductUpdate,
} from "@/store/products";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Card,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  TableFooter,
  TablePagination,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import ProductsTableHeader from "../lists/ProductsTableHeader";
import { useProductDrawer } from "@/context/ProductDrawerContext";
import AddProducts from "../lists/AddProducts";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { getConfirmDialog } from "@/store/activity";
import EditProductDrawer from "../lists/EditProductDrawer";
import ProductsViewPage from "./ProductsViewPage";
const ProductsViewList = () => {
  const dispatch = useDispatch<AppDispatch>();
  // const {toggleOpen,isOpen}=useProductDrawer();
  const [recordsperpage, setRecordsPerPage] = useState<number>(5);
  const [anchorE1, setanchorE1] = useState(null);
  const [selecteditem, setSelectedItem] = useState<any>();
  const [page, setPage] = useState(0);
  const [category,setcategory]=useState<any>()
  useEffect(() => {
    dispatch(getAllProducts({ page, recordsperpage ,category}));
  }, [recordsperpage, page,category]);
  const { products, meta, uiProduct } = useSelector(
    (state: RootState) => state.products
  );

  const toggleOpen = () => {
    dispatch(uiProductUpdate({ addProduct: { open: true } }));
  };
  const handleUpdate = (id: any) => {
    dispatch(getProduct(id));
    dispatch(uiProductUpdate({ updateProduct: { open: true } }));
    handleCloseMenu();
  };
  const handleView = (id: any) => {
    dispatch(getProduct(id));
    dispatch(uiProductUpdate({ viewProduct: { open: true } }));
    handleCloseMenu();
  };
  const handleMenuClick = (
    event: { currentTarget: React.SetStateAction<null> },
    item: any
  ) => {
    setanchorE1(event.currentTarget);
    setSelectedItem(item);
  };

  const handleChangePage = (
    event: any,
    newPage: React.SetStateAction<number>
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: { target: { value: string } }) => {
    setRecordsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleCloseMenu = () => {
    setanchorE1(null);
    setSelectedItem(null);
  };



  const handleDelete = (id: any) => {
    // dispatch(DeleteProduct(id))
    dispatch(
      getConfirmDialog({
        confirmationDialog: { open: true, id, action: deleteProduct },
      })
    );
    handleCloseMenu();
  };
const handleFilter=useCallback((val:any)=>{
setcategory(val)
},[])
  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <ProductsTableHeader handleFilter={handleFilter} category={category} toggle={toggleOpen}/>
      </Grid>
      <Grid size={12}>
        <Card>
          <Divider />
          <TableContainer
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Table
              style={{ width: "100%", margin: "2rem auto" }}
              aria-label="simple table"
            >
              <TableHead>
                <TableRow style={{ backgroundColor: "#f5f5f7" }}>
                  <TableCell>S.No</TableCell>
                  <TableCell align="right">Title</TableCell>
                  <TableCell align="right">Description</TableCell>
                  <TableCell align="right">Category</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products?.map((row: any, index: number) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {index}
                    </TableCell>
                    <TableCell align="right">{row.title}</TableCell>
                    <TableCell align="right">
                      {row?.description?.length > 50
                        ? row?.description?.substring(0, 50) + "..."
                        : row?.description}
                    </TableCell>
                    <TableCell align="right">{row?.category}</TableCell>
                    <TableCell align="right">{"$" + row?.price || 0}</TableCell>
                    <TableCell align="right">
                      <IconButton
                        aria-controls={`menu-${row.id}`}
                        aria-haspopup="true"
                        onClick={(event: any) => handleMenuClick(event, row)}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]} // You can customize this
                  component="div"
                  colSpan={6}
                  count={meta?.total_records}
                  rowsPerPage={recordsperpage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableFooter>
            </Table>
            <Menu
              id={`menu-${selecteditem?.id}`}
              anchorEl={anchorE1}
              keepMounted
              open={Boolean(anchorE1)}
              onClose={handleCloseMenu}
            >
              <MenuItem onClick={() => handleView(selecteditem?._id)}>
                <VisibilityIcon /> View
              </MenuItem>

              <MenuItem onClick={() => handleUpdate(selecteditem?._id)}>
                <EditIcon /> Edit
              </MenuItem>

              <MenuItem onClick={() => handleDelete(selecteditem?._id)}>
                <DeleteIcon /> Delete
              </MenuItem>
            </Menu>
            {/* {isOpen && <AddProducts/>} */}
            <AddProducts open={uiProduct.addProduct.open} />
            <EditProductDrawer open={uiProduct.updateProduct.open} />
            <ProductsViewPage open={uiProduct.viewProduct.open} />
          </TableContainer>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ProductsViewList;
