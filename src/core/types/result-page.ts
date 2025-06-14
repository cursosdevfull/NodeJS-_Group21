export type ResultPage<T> = {
    data: T[];
    total: number;
    page: number;
    limit: number;
}