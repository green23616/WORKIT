'use client'

import { ResponsiveBar } from "@nivo/bar";

export default function ChartBar(){

  let data = [
    {
        "days": "일",
        "date": "2024-06-30",
        "carb": 100,
        "protein" : 55,
        "fat" : 79
    },
    {
        "days": "월",
        "date": "2024-06-24",
        "carb": 0,
        "protein" : 0,
        "fat" : 0
    },
    {
        "days": "화",
        "date": "2024-06-25",
        "carb": 0,
        "protein" : 0,
        "fat" : 0
    },
    {
        "days": "수",
        "date": "2024-06-26",
        "carb": 0,
        "protein" : 0,
        "fat" : 0
    },
    {
        "days": "목",
        "date": "2024-06-27",
        "carb": 0,
        "protein" : 0,
        "fat" : 0
    },
    {
        "days": "금",
        "date": "2024-06-28",
        "carb": 0,
        "protein" : 0,
        "fat" : 0
    },
    {
        "days": "토",
        "date": "2024-06-29",
        "carb": 0,
        "protein" : 0,
        "fat" : 0
    }
    ]

  return(
    <ResponsiveBar
        data={data}
        keys={[
            'carb',
            'protein',
            'fat'
        ]}
        indexBy="days"
        margin={{ top: 80, right: 0, bottom: 30, left: 50 }}
        padding={0.3}
        groupMode="grouped"
        colors={{ scheme: 'tableau10' }}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legendPosition: 'middle',
            legendOffset: 32,
            format: value => {
              const item = data.find(d => d.days === value);
              if (item) {
                const day = item.date.split('-')[2];
                return `${value} ${day}`;
              }
              return value;
            },
        }}
        axisLeft={{
            tickSize: 5,
            tickValues : 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: '달성률',
            legendPosition: 'end',
            legendOffset: -70,
            truncateTickAt: 0,
            format : value => `${value}%`
        }}
        enableLabel={false}
        totalsOffset={14}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    1.6
                ]
            ]
        }}
        
        legends={[
            {
                dataFrom: 'keys',
                data: [
                    { id: 'carb', label: '탄수화물', color: 'hsl(211, 37%, 48%)' },
                    { id: 'protein', label: '단백질', color: 'hsl(30, 89%, 56%)' },
                    { id: 'fat', label: '지방', color: 'hsl(360, 70%, 61%)' }
                ],
                anchor: 'top-right',
                direction: 'row',
                justify: false,
                translateX: -170,
                translateY: -80,
                itemsSpacing: 70,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: 'left-to-right',
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
        role="application"
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={e=>e.id+": "+e.formattedValue+" in country: "+e.indexValue}
        theme={{
            legends: {
                text: {
                    fontSize: 20,
                    fontWeight : 800,
                }
            },
            axis : {
                ticks : {
                    text : {
                    fontSize: 14,
                    fontWeight: 800,
                }
                }
            }
        }}
        tooltip={({ value }) => (
          <h4 style={{ color: '#000', fontSize : 12 }}>
            {value}%
          </h4>
        )}
    />
  )
}