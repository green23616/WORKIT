import ChartLine from "../../../components/chart/chartLine";

export default function Weight(){
  return(
    <>
    <div className="monthly-header">
      <h3 style={{ textAlign : "center" }}>8월의 체중변화</h3>
    </div>
    <div className="monthly-body">
      <div className="chart4">
        <ChartLine />
      </div>
    </div>
    </>
  )
}