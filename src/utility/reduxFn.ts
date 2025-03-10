import { FilesUploadSelectedType, setDownLoadState, setFilesUploadSelectedState, setFilesUrls, setLoadingState, setPageState, setSelectedState, setViewSelectBox, setViewState, store } from "@/redux/Silce";
export function setFilesUrlsFn(arr: string[]) {
  store.dispatch(setFilesUrls(arr));
}
export function setViewSelect(boolean: boolean) {
  store.dispatch(setViewSelectBox(boolean));
}
export function setLoading(boolean: boolean) {
  store.dispatch(setLoadingState(boolean));
}
export function setView(number: number) {
  store.dispatch(setViewState(number));
}
export function setPage(number: number) {
  store.dispatch(setPageState(number));
}
export function setSelected(arr: string[]) {
  store.dispatch(setSelectedState(arr));
}
export function setDownLoad(boolean: boolean) {
  store.dispatch(setDownLoadState(boolean));
}

export function setFilesUploadSelected(files: FilesUploadSelectedType[]) {
  store.dispatch(setFilesUploadSelectedState(files));
}
