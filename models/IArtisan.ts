import ITimeData from "./ITimeData"

export default interface IArtisan extends ITimeData {
  id: string
  name: string
  first_name: string
  avatarUri: string
  isPro: boolean
  commercial_name: string
  description: string
  job: string
  reviews: any[]
}