interface IParams {
  pagination?: { page: number, perPage: number },
  sort?: { field: string, order: string },
  filter?: {}
}

export { IParams }