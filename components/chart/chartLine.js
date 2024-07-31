'use client'

import { ResponsiveLine } from "@nivo/line";

export default function ChartLine(){

  let data = [
    {
      "id": "weight",
      "color": "hsl(205, 70%, 50%)",
      "data": [
        {
          "x": "1주",
          "y": 86.0
        },
        {
          "x": "2주",
          "y": 0
        },
        {
          "x": "3주",
          "y": 0
        },
        {
          "x": "4주",
          "y": 0
        },
        {
          "x": "5주",
          "y": 0
        }
      ]
    }
  ]

  return(
    <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 60, bottom: 70, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: true,
            reverse: false
        }}
        yFormat=" >-.2f"
        colors={{ scheme: 'category10' }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabel="data.yFormatted"
        pointLabelYOffset={-12}
        enableTouchCrosshair={true}
        useMesh={true}
        theme={{
          axis: {
            ticks: {
              text: {
                fontSize: 16
              }
            }
          }
        }}
        axisBottom={{
          tickPadding: 20, // x축 패딩 설정
        }}
        axisLeft={{
          tickPadding : 10
        }}
    />
  )
}