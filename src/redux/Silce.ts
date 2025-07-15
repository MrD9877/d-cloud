"use client";
import { createSlice, configureStore } from "@reduxjs/toolkit";

export type FilesUploadSelectedType = {
  name: string;
  url: string;
};
// setFilesUrls,
export type StoreState = {
  fileUrls: string[];
  fileType: "video" | "image" | undefined;
  viewSelectBox: boolean;
  view: number;
  page: number;
  selected: string[];
  loading: boolean;
  download: boolean;
  filesUploadSelected: FilesUploadSelectedType[];
  error: string | null;
};

const initialState: StoreState = {
  fileUrls: [],
  fileType: undefined,
  viewSelectBox: false,
  view: 6,
  page: 1,
  selected: [],
  loading: false,
  download: false,
  filesUploadSelected: [],
  error: null,
};

const userSlice = createSlice({
  name: "file",
  initialState,
  reducers: {
    setFilesUrls: (state, action: { type: string; payload: string[] }) => {
      state.fileUrls = action.payload;
    },
    setFileType: (state, action: { payload: "video" | "image"; type: string }) => {
      state.fileType = action.payload;
    },
    setError: (state, action: { payload: string | null }) => {
      state.error = action.payload;
    },
    setViewSelectBox: (state, action: { payload: boolean; type: string }) => {
      if (action.payload === false) {
        state.selected = [];
      }
      state.viewSelectBox = action.payload;
    },
    setViewState: (state, action: { payload: number; type: string }) => {
      state.view = action.payload;
    },
    setPageState: (state, action: { payload: number; type: string }) => {
      state.page = action.payload;
    },
    setSelectedState: (state, action: { payload: string[]; type: string }) => {
      state.selected = action.payload;
    },
    setLoadingState: (state, action: { payload: boolean; type: string }) => {
      state.loading = action.payload;
    },
    setDownLoadState: (state, action: { payload: boolean; type: string }) => {
      state.download = action.payload;
    },
    deleteFilesRedux: (state, action: { payload: string[]; type: string }) => {
      state.fileUrls = state.fileUrls.filter((url) => !action.payload.includes(url));
      state.selected = [];
      state.viewSelectBox = false;
      state.filesUploadSelected = state.filesUploadSelected.filter((obj) => {
        return !action.payload.includes(obj.url);
      });
    },
    setFilesUploadSelectedState: (state, action: { payload: FilesUploadSelectedType[]; type: string }) => {
      state.filesUploadSelected = action.payload;
    },
  },
});

export const { setFilesUrls, setFileType, setViewSelectBox, setViewState, setPageState, setSelectedState, setLoadingState, setDownLoadState, deleteFilesRedux, setFilesUploadSelectedState, setError } = userSlice.actions;

export const store = configureStore({
  reducer: userSlice.reducer,
});
