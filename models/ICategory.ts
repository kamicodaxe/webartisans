import IProduct from "./IProduct"
import TimeData from "./ITimeData"

interface ICategory extends TimeData {
  id: string
  name: string
  slug: string
  desc?: string
  photoURL?: string
  weight?: number
  stats?: {
    sessions?: number
    sales?: number
    invoicesNo?: number
  },
  createdBy?: { uid: string, name: string, surname: string },
  products?: IProduct[]
}

export default ICategory