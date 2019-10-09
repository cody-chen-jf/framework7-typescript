interface ListQuery extends AnyObject {
  totalElements: number
  totalPages: number
  first: boolean
  last: boolean
  numberOfElements: number
  size: number
  number: number
  sort: [{
    direction: string
    property: string
    ignoreCase: boolean
    nullHandling: string
    ascending: boolean
  }]
}
