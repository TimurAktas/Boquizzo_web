export interface BaseSlicerError extends Error {
    code: string;
}

export interface BaseSliceState<DataType, ErrorType = BaseSlicerError> {
    data: DataType;
    loading: boolean;
    error: ErrorType | null;
}
