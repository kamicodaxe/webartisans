import { Timestamp } from "firebase/firestore";

interface ITimeData {
  createdAt: Timestamp | string
  updatedAt: Timestamp | string
}

export default ITimeData;