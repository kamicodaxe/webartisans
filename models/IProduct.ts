import ITimeData from "./ITimeData"

export default interface IProduct extends ITimeData {
  id: string
  name: string
  slug?: string
  href?: string
  imageSrc?: string
  imageAlt?: string
  status: string // approved | pending | declined
  approvedBy?: {
    uid: string
    displayName: string
  }
  desc?: string
  price: string
  color?: string
  owner: {
    id: string
    displayName: string
  }
  stats: {
    views?: number
    orders?: number
  }
}