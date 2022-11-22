export interface BaseSlicerError extends Error {
    code: string;
}

export interface BaseSliceState<DataType, ErrorType = BaseSlicerError> {
    data: DataType | undefined;
    loading: boolean;
    error: ErrorType | null;
}
