
import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import exportingInit from 'highcharts/modules/exporting';
import exportDataInit from 'highcharts/modules/export-data';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';



const optionsMap = {
  temperature: { title: 'Temperature', unit: '°C' },
  humidity: { title: 'Humidity', unit: '%' },
  pressure: { title: 'Pressure', unit: 'hPa' }
};

const WeatherChart = () => {
  const [param, setParam] = useState('temperature');
  const [chartType, setChartType] = useState('line');
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/${param}`)
      .then(res => {
        const formatted = res.data.map(d => [
          new Date(d.timestamp).getTime(),
          d.value
        ]);
        setData(formatted);
      })
      .catch(() => alert('Failed to fetch data'));
  }, [param]);

  const options = {
    chart: {
      type: chartType,
       zoomType: 'x' 
    },
    title: {
      text: `${optionsMap[param].title} Chart`
    },
    yAxis: {
      title: {
        text: `${optionsMap[param].title} (${optionsMap[param].unit})`
      }
    },
    xAxis: chartType === 'pie' ? undefined : {
      type: 'datetime',
      title: { text: 'Time' }
    },
    exporting: {
  enabled: true,
  buttons: {
      contextButton: {
        menuItems: [
          'downloadPNG',
          'downloadJPEG',
          'downloadPDF',
          'downloadSVG',
          'separator',
          'downloadCSV',
          'downloadXLS'
        ]
      }
    }
},
credits: {
      enabled: false
    },
    series: [
      chartType === 'pie'
        ? {
            name: optionsMap[param].title,
            colorByPoint: true,
            data: data.map(([timestamp, value]) => ({
              name: new Date(timestamp).toLocaleTimeString(),
              y: value
            })),
            type: 'pie'
          }
        : {
            name: optionsMap[param].title,
            data,
            type: chartType
          }
    ]
  };

  return (
    <div className="container mt-4"
      style={{
    backgroundColor:'cyan',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    padding: '20px',
  }}
  >
          <img
    src="/images/images.jfif" 
    alt="Weather Banner"
    className="img-fluid rounded mb-3"
    style={{ maxHeight: '150px',width:'100%' }}
  />
      <div className="row mb-3">
        <div className="col-md-4">
          <label className="form-label">Select Parameter:</label>
          <select className="form-select" value={param} onChange={e => setParam(e.target.value)}>
            <option value="temperature">Temperature</option>
            <option value="humidity">Humidity</option>
            <option value="pressure">Pressure</option>
          </select>
        </div>

        <div className="col-md-4">
          <label className="form-label">Select Chart Type:</label>
          <select
  className="form-select"
  value={chartType}
  onChange={e => setChartType(e.target.value)}
>
  <option value="line">Line</option>
  <option value="spline">Spline</option>
  <option value="area">Area</option>
  <option value="areaspline">Area Spline</option>
  <option value="column">Column</option>
  <option value="bar">Bar</option>
  <option value="scatter">Scatter</option>
  <option value="pie">Pie</option>
</select>

        </div>
      </div>
           <h4 className="mb-3 text-center">Weather Parameter Chart (Last 24 Hours)</h4>
      <div className="card p-3 shadow-sm">
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    </div>
  );
};

export default WeatherChart;
