import { ResponsivePie } from "@nivo/pie"

export default function ChartPie(props){


    let data = 
    [
    {
        "id": "탄수화물",
        "label": "탄수화물",
        "value": props.chartCarb
    },
    {
        "id": "단백질",
        "label": "단백질",
        "value": props.chartProtein
    },
    {
        "id": "지방",
        "label": "지방",
        "value": props.chartFat
    }
    ]

  return(
    <>
    <ResponsivePie
        data={data}
        margin={{ top: 30, right: 50, bottom: 60, left: 50 }}
        startAngle={-140}
        colors={{ scheme: 'tableau10' }}
        innerRadius={0.4}
        padAngle={1.5}
        cornerRadius={4}
        activeOuterRadiusOffset={8}
    />
    </>
  )
}