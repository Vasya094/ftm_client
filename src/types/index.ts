export interface RegisterFormPropsTypes {
  handleSubmit(e: any): Promise<void>
  name: string
  setName(field: string): void
  userName: string
  setUserName(field: string): void
  password: string
  setPassword(field: string): void
  showTipUnderUsername: boolean
  setShowTipUnderUsername(field: boolean): void
}

export interface LoginFormPropsTypes {
  handleSubmit(e: any): Promise<void>
  userName: string
  setUserName(field: string): void
  password: string
  setPassword(field: string): void
}

export interface UserToAuthTypes {
  name?: string
  userName: string
  password: string
}

export interface UserInStoreTypes {
  token: string
  user: {
    _id: string
    name: string
    userName: string
    createdAt: string
    updatedAt: string
  }
}

export interface LocationTypes {
  formatted_address: string
  place_id: string
  types: string[]
}

export interface LocationTypeNew {
  placeId: string
  namesInLangs: { en: string; ru: string; ar: string }[] | {}
}

export interface NewApplicationTypes {
  title: string
  description: string
  _id?: string
  startLocation?: LocationTypeNew
  finishLocation?: LocationTypeNew
  pricePerKg: number | string
  addedBy: string
  communicationWays: string
  travelDate: string | Date
  cargoInfo?: {
    willNotTake?: string
    iCanGoAndBuy?: boolean
  }
  type?: string
  createdAt?: string
  updatedAt?: string
}

export interface ApplicationCreateFormPropsTypes {
  values: NewApplicationTypes
  typeOfApplication: boolean
  setTypeOfApplication(field: any): void
  handleChange(e: any): void
  handleSubmit(e: any): Promise<void>
  startLocation?: LocationTypes
  finishLocation?: LocationTypes
  setStartLocation(field?: LocationTypes): void
  setFinishLocation(field?: LocationTypes): void
}
export interface MainFiltersTypes {
  startLocation?: string
  finishLocation?: string
  type?: string
}
