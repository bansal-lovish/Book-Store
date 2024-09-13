import { useProductDrawer } from "@/context/ProductDrawerContext";
import {
  Box,
  BoxProps,
  Button,
  Divider,
  Drawer,
  FormControl,
  FormHelperText,
  IconButton,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import * as yup from "yup";
import Grid from "@mui/material/Grid2";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { addProduct, uiProductUpdate } from "@/store/products";
import SelectDropdown from "@/components/formcomponents/SelectDropdown";
const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  image: yup.string().nullable().required("Image URL is required"),
  price: yup.number().nullable().required("Price is required"),
  category: yup.string().required("Category is required"),
  author: yup.string().required("Author is required"),
  quantity: yup.number().nullable().required("Quantity is required")
});

const AddProducts = ({ open }: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const Header = styled(Box)<BoxProps>(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(2, 2),
    justifyContent: "space-between",
    backgroundColor: theme.palette.background.default,
  }));

  const handleClose = () => {
    reset();
    dispatch(uiProductUpdate({ addProduct: { open: false } }));
  };

  const defaultValues = {
    title: "",
    description: "",
    author: "",
    image: "",
    price: null,
    category: "",
    quantity:null,
  };

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: "onChange",
    resolver: yupResolver(schema as any),
  });

  const onSubmit = (data: any) => {
    if (!data?.id) {
      data.id = Math.floor(Math.random() * (100 - 1)) + 1;
    }
    dispatch(addProduct(data))
      .unwrap()
      .then(() => {
        reset();
      });
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={handleClose}
      ModalProps={{ keepMounted: false }}
      PaperProps={{
        sx: { width: { xs: "90%", sm: 600, lg: 550 }, zIndex: 9999 },
      }}
    >
      <Header>
        <Typography variant="h6">Add Product</Typography>
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </Header>
      <Divider />
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
          height: "100%",
          padding: "12px",
        }}
      >
        <Grid container spacing={1}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormControl fullWidth margin="normal">
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <TextField
                    label="Title"
                    variant="outlined"
                    {...field}
                    size="small"
                    error={Boolean(errors.title)}
                    helperText={errors.title?.message}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormControl fullWidth margin="normal">
              <Controller
                name="category"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <SelectDropdown
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
                      {id: "Inspirational/Religious Fiction",value: "Inspirational/Religious Fiction",},
                      {id: "Short Stories/Novellas",value: "Short Stories/Novellas",},
                    ]}
                    idkey={"id"}
                    valuekey={"value"}
                    onChange={onChange}
                    value={value}
                    noneMenuItem={true}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormControl fullWidth margin="normal">
              <Controller
                name="author"
                control={control}
                render={({ field }) => (
                  <TextField
                    label="Author"
                    variant="outlined"
                    {...field}
                    size="small"
                    error={Boolean(errors.author)}
                    helperText={errors.author?.message}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormControl fullWidth margin="normal">
              <Controller
                name="price"
                control={control}
                render={({ field }) => (
                  <TextField
                    label="Price"
                    variant="outlined"
                    {...field}
                    size="small"
                    type="number"
                    error={Boolean(errors.price)}
                    helperText={errors.price?.message}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid size={12}>
            <FormControl fullWidth margin="normal">
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <TextField
                    label="Description"
                    variant="outlined"
                    {...field}
                    size="small"
                    multiline
                    rows={3}
                    error={Boolean(errors.description)}
                    helperText={errors.description?.message}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid size={12}>
            <FormControl fullWidth margin="normal">
              <Controller
                name="image"
                control={control}
                render={({ field }) => (
                  <TextField
                    label="Image URL"
                    variant="outlined"
                    {...field}
                    size="small"
                    error={Boolean(errors.image)}
                    helperText={errors.image?.message}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid size={12}>
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="small"
              >
                Submit
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Drawer>
  );
};

export default AddProducts;
