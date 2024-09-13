// ** Redux Imports
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface DataParams {
  start?: string;
  message?: string;
  success?: string;
}
interface ConfirmDialogParams {
  confirmationDialog: {
    open: boolean;
    id: any;
    action: any;
    message?: string;
    payload?: any;
  };
}
// ** Fetch Activity
export const fetchStart = createAsyncThunk(
  'appActivity/fetchStart',
  async (params?: DataParams) => {
    return params?.start;
  }
);

export const fetchSuccess = createAsyncThunk(
  'appActivity/fetchSuccess',
  async (params?: DataParams) => {
    return params?.success;
  }
);

export const fetchError = createAsyncThunk(
  'appActivity/fetchError',
  async (params?: DataParams) => {
    return params?.message;
  }
);
export const getConfirmDialog = createAsyncThunk(
  "appActivity/getConfirmDialog",
  async (params?: ConfirmDialogParams) => {

    return params;
  }
);
interface type {
  start: string;
  message: string;
  success: string;
  errors: [];
  ui: {
    open: boolean;
    confirmationDialog: {
      open: boolean;
      id: any;
      action: any;
      message?: string;
      payload?: any;
    };
  };
}
const initialState: type = {
  start: '',
  message: '',
  success: '',
  errors: [],
  ui: {
    open: false,
    confirmationDialog: {
      open: false,
      id: "",
      action: null,
      message: "",
      payload: null,
    },
  },
};
export const appActivitySlice = createSlice({
  name: 'activity',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStart.fulfilled, (state, { payload }) => {
        state.ui = { ...state.ui, ...{ open: true } };
        state.start = payload as string;
      })
      .addCase(fetchSuccess.fulfilled, (state, { payload }) => {
        state.ui = { ...state.ui, ...{ open: false } };
        state.success = payload as string;
      })
      .addCase(fetchError.fulfilled, (state, { payload }) => {
        state.ui = { ...state.ui, ...{ open: false } };
        state.message = payload as string;
      })
      .addCase(getConfirmDialog.fulfilled, (state, action) => {
        
        state.ui = { ...state.ui, ...action.payload };
      })
    }
});

export default appActivitySlice.reducer;