'use client'

import { ResponsivePie } from "@nivo/pie"

export default function ChartPie2(){


    let data = 
    [
    {
        "id": "탄수화물",
        "label": "탄수화물",
        "value": 5
    },
    {
        "id": "단백질",
        "label": "단백질",
        "value": 3
    },
    {
        "id": "지방",
        "label": "지방",
        "value": 2
    }
    ]

  return(
    <>
    <ResponsivePie
        data={data}
        margin={{ top: 30, right: 50, bottom: 60, left: 50 }}
        startAngle={-140}
        colors={{ scheme: 'accent' }}
        innerRadius={0.4}
        padAngle={1.5}
        cornerRadius={4}
        activeOuterRadiusOffset={8}
    />
    </>
  )
}