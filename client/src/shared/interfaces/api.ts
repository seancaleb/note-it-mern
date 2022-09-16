export interface APIError {
    status: number;
    message: string;
}

export interface APIDeleteResult {
    deleteResult: {
        deletedCount: number;
    };
}
