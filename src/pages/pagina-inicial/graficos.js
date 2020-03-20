import React from 'react'
import {
  PieChart, Pie, Tooltip
} from 'recharts'

const data01 = [
  { name: 'Group A', value: 400 }, { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 }, { name: 'Group D', value: 200 },
  { name: 'Group E', value: 278 }, { name: 'Group F', value: 189 }
]

const Graficos = () => {
  return (
    <PieChart width={250} height={250}>
      <Pie dataKey='value' isAnimationActive data={data01} cx={125} cy={125} outerRadius={50} fill='#8884d8' label />
      <Tooltip />
    </PieChart>
  )
}

export default Graficos
