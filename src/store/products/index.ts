import { createAsyncThunk, createSlice, Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { AppDispatch } from "..";
import { useProductDrawer } from "@/context/ProductDrawerContext";
interface Redux {
  getState: any;
  dispatch: Dispatch<any>;
  rejectWithValue: (value: any) => void;
}
// eslint-disable-next-line react-hooks/rules-of-hooks

export const getAllProducts = createAsyncThunk(
  "products/getAllProducts",
  async (params: any, { dispatch, rejectWithValue }) => {
    const categoryquery=params?.category ? `&category=${params?.category}` : '';
    const res = await axios.get(`http://localhost:4001/book?page=${params?.page}&recordsperpage=${params?.recordsperpage}${categoryquery}`);
    if (res) {
      return res;
    } else {
      toast.error("error", {
        position: "top-center",
      });
      return res;
    }
  }
);
export const getProduct = createAsyncThunk(
  "products/getProduct",
  async (params: any, { dispatch, rejectWithValue }) => {
    const res = await axios.get(`http://localhost:4001/book/${params}`);
    if (res) {
      return res;
    } else {
      toast.error("error", {
        position: "top-center",
      });
      return res;
    }
  }
);
export const addProduct = createAsyncThunk(
  "products/AddProduct",
  async (data: any, { dispatch }) => {
    const res = await axios.post(`http://localhost:4001/book`, data);

    if (res.status === 201) {
      
      dispatch(getAllProducts({}));
dispatch(uiProductUpdate({addProduct:{open:false}}))
      return res;
    } else {
      toast.error("error", {
        position: "top-center",
      });
      return res;
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/UpdateProduct",
  async (params: { data: any; id: any }, { dispatch, rejectWithValue }) => {
    const res = await axios.put(
      `http://localhost:4001/book/${params?.id}`,
      params?.data
    );
    if (res) {
      dispatch(getAllProducts({}));
      dispatch(uiProductUpdate({ updateProduct: { open: false } }));
      return res;
    } else {
      toast.error("error", {
        position: "top-center",
      });
      return res;
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/DeleteProduct",
  async (params:any, { dispatch, rejectWithValue }) => {
    console.log('params: ', params);
    const res = await axios.delete(
      `http://localhost:4001/book/${params}`
    );
    if (res) {
      dispatch(getAllProducts({}));
      return res;
    } else {
      toast.error("error", {
        position: "top-center",
      });
      return res;
    }
  }
);

export const uiProductUpdate: any = createAsyncThunk(
  'event/uiProductUpdate',
  async (data: any) => {
    return data;
  }
);
interface initialStateType {
  products: any;
  product:any;
  meta: {
    total_pages: null | number;
    current_page: null | number;
    records_per_page: null | number;
    total_records: any;
    next_page: null | number;
    previous_page: null | number;
  };
  uiProduct: {
    addProduct: {
      open: boolean,
    },
    viewProduct: {
      open: boolean,
    },
    updateProduct: {
      open: boolean,
    },
  },
}
const initialState: initialStateType = {
  products: [],
  product: {},
  meta: {
    total_pages: null,
    current_page: null,
    records_per_page: null,
    total_records: null,
    next_page: null,
    previous_page: null,
  },
  uiProduct: {
    addProduct: {
      open: false,
    },
    viewProduct: {
      open: false,
    },
    updateProduct: {
      open: false,
    },
  },
};
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.fulfilled, (state, { payload }) => {
        state.products = payload.data.books;
        state.meta=payload.data.meta
      })

      .addCase(getProduct.fulfilled, (state, { payload }) => {
        state.product = payload.data;
      })
      .addCase(uiProductUpdate.fulfilled, (state, action) => {
        state.uiProduct = { ...state.uiProduct, ...action.payload };
      });
  },
});
export default productsSlice.reducer;
