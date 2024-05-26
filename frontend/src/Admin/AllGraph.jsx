import React, { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { useGetbusMutation } from '../slices/bus.js';

import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';

import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';

import { PieChart } from '@mui/x-charts/PieChart';

const barChartsParams = {
  series: [
    { data: [5], label: 'Top Bus' },
    { data: [3], label: 'Less Bus' },

  ],
  height: 400,
};
const lineChartsParams = {
  series: [
    { data: [3, 4, 1, 6, 5], label: 'A', area: false, stack: 'total' },
    { data: [4, 3, 1, 5, 8], label: 'B', area: false, stack: 'total' },
    { data: [4, 2, 5, 4, 1], label: 'C', area: false, stack: 'total' },
  ],
  xAxis: [{ data: [1, 2, 3, 4, 5], type: 'linear' }],
  height: 400,
};



const pieChartsParams = {
  series: [
    {
      data: [{ value: 5 }, { value: 10 }, { value: 15 }],
      label: 'Series 1',
      outerRadius: 80,
      highlighted: { additionalRadius: 10 },
    },
    {
      data: [{ value: 5 }, { value: 10 }, { value: 15 }],
      label: 'Series 1',
      innerRadius: 90,
      highlighted: { additionalRadius: 10 },
    },
  ],
  height: 400,
  margin: { top: 50, bottom: 50 },
};

export default function ElementHighlights() {
  const [chartType, setChartType] = React.useState('bar');
  const [withArea, setWithArea] = React.useState(false);
  const [highlighted, setHighlighted] = React.useState('item');
  const [faded, setFaded] = React.useState('global');

  const handleChartType = (event, newChartType) => {
    if (newChartType !== null) {
      setChartType(newChartType);
    }
  };


  const [getbus] = useGetbusMutation();
const [data, setData] = useState([]);
useEffect(() => {
  fetchData(); // Fetch data when the component mounts
}, []);

const fetchData = async () => {
  try {
    const result = await getbus();
    const newData = result.data.data;
    

    console.log("Original data:", newData); // Log the original data



    const sundayData =newData.filter(item => item.name1 === 'Rocket Air Bus');
      console.log(sundayData)
    setSunday(sundayData.length) 

    
  } catch (error) {
    console.error('Failed to fetch schedules:', error);
  }
};


  return (
    <Stack
      direction={{ xs: 'column', xl: 'row' }}
      spacing={1}
      sx={{ width: '60%' }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <ToggleButtonGroup
          value={chartType}
          exclusive
          onChange={handleChartType}
          aria-label="chart type"
          fullWidth
        >
          {['bar', 'line', 'pie'].map((type) => (
            <ToggleButton key={type} value={type} aria-label="left aligned">
              {type}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
        {chartType === 'bar' && (
          <BarChart
            {...barChartsParams}
            series={barChartsParams.series.map((series) => ({
              ...series,
              highlightScope: {
                highlighted,
                faded,
              },
            }))}
          />
        )}

        {chartType === 'line' && (
          <LineChart
            {...lineChartsParams}
            series={lineChartsParams.series.map((series) => ({
              ...series,
              area: withArea,
              highlightScope: {
                highlighted,
                faded,
              },
            }))}
          />
        )}

       

        {chartType === 'pie' && (
          <PieChart
            {...pieChartsParams}
            series={pieChartsParams.series.map((series) => ({
              ...series,
              highlightScope: {
                highlighted,
                faded,
              },
            }))}
          />
        )}
      </Box>
      <Stack
        direction={{ xs: 'row', xl: 'column' }}
        spacing={3}
        justifyContent="center"
        flexWrap="wrap"
        useFlexGap
      >
        {/* <TextField
          select
          label="highlighted"
          value={highlighted}
          onChange={(event) => setHighlighted(event.target.value)}
          sx={{ minWidth: 50 }}
        >
          <MenuItem value={'none'}>none</MenuItem>
          <MenuItem value={'item'}>item</MenuItem>
          <MenuItem value={'series'}>series</MenuItem>
        </TextField>
        <TextField
          select
          label="faded"
          value={faded}
          onChange={(event) => setFaded(event.target.value)}
          sx={{ minWidth: 50 }}
        >
          <MenuItem value={'none'}>none</MenuItem>
          <MenuItem value={'series'}>series</MenuItem>
          <MenuItem value={'global'}>global</MenuItem>
        </TextField> */}
        {chartType === 'line' && (
          <FormControlLabel
            control={
              <Switch
                checked={withArea}
                onChange={(event) => setWithArea(event.target.checked)}
              />
            }
            label="Fill line area"
          />
        )}
      </Stack>
    </Stack>
  );
}