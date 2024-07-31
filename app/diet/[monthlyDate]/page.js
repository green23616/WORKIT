import { connectDB } from "../../../util/database";
import Monthly from "./monthly";
import { authOptions } from "../../../pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

export default async function MonthlyDate(props){

  const client = await connectDB;
  const db = client.db('workit');
  let session = await getServerSession(authOptions);
  let userName = session ? session.user.name : 'demo';

  let monthlyDate = props.params.monthlyDate;
  let diet = await db.collection('diet').find({ time2: { $regex: monthlyDate }, user: userName }).toArray();

  return(
    <>
    <div className="monthly-header">
      <p>{monthlyDate}</p>
    </div>
    <div className="monthly-body">
      <Monthly diet={diet} />
    </div>
    </>
  )
}