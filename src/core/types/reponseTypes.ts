export interface PaginatedResponseType<T> {
  pagination: PaginationType;
  data: T[];
}

// export interface PostsPaginatedResponseType<T> {
//   pagination: PaginationType;
//   posts: T[];
// }

// export interface PostLikePaginatedResponseType<T> {
//   pagination: PaginationType;
//   likes: T[];
// }

export interface APIResponseType<T> {
  data: T;
  error: boolean;
  message: string;
}

export interface PaginationType {
  total: number;
  count: number;
  currentPage: number;
  totalPages: number;
}

// export interface PaginationType {
//   next: string | null;
//   previous: string | null;
//   count: number;
//   total_page: number;
//   current_page: number;
// }
