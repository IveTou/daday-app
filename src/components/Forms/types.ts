
type ActionDataState<T, E>= {
  errors?: string
  fieldErrors?: E
  success?: boolean
  data?: T
}
