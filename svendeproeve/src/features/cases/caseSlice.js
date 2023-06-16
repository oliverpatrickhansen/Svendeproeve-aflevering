import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import caseService from "./caseService";

const initialState = {
  cases: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create new case
export const createCase = createAsyncThunk(
  "cases/create",
  async (caseData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await caseService.createCase(caseData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete user case
export const deleteCase = createAsyncThunk(
  "cases/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await caseService.deleteCase(id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Edit case
export const editCase = createAsyncThunk(
  "cases/edit",
  async ({caseId,caseData}, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await caseService.editCase(caseId,caseData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get user cases
export const getUserCases = createAsyncThunk(
  "cases/getAllUser",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await caseService.getUserCases(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get case
export const getCase = createAsyncThunk(
  "cases/get",
  async(id,thunkAPI) => {
    try {
      return await caseService.getCase(id);
  } catch(error){
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
        error.message ||
        error.toString();
        return thunkAPI.rejectWithValue(message);
  }
}
);

// Get all cases

export const getAllCases = createAsyncThunk(
  "cases/all",
  async (_, thunkAPI) => {
    try {
      return await caseService.getAllCases();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const caseSlice = createSlice({
  name: "case",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCase.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCase.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cases.push(action.payload);
      })
      .addCase(createCase.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getUserCases.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserCases.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cases = action.payload;
      })
      .addCase(getUserCases.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getCase.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCase.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cases = action.payload;
      })
      .addCase(getCase.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAllCases.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllCases.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cases = action.payload;
      })
      .addCase(getAllCases.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteCase.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCase.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cases = state.cases.filter(
          (_case) => _case._id !== action.payload.id
        );
      })
      .addCase(deleteCase.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = caseSlice.actions;
export default caseSlice.reducer;
