export default interface Pageable {
  limit: number,
  page: number,
  search: string,
  // Total number of available objects
  totalElements: number,
  totalPages: number
}
