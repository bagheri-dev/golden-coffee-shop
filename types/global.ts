interface IGlobalRes<T> {
  status: string;
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: T;
}
