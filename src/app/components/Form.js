// src/components/Form.js
'use client'
import { useState, useEffect } from 'react';
import styles from './Form.module.css';

const Form = ({ onDataReceived }) => {
  const [states, setStates] = useState([]);
  const [state, setState] = useState('');
  const [districts, setDistricts] = useState([]);
  const [district, setDistrict] = useState('');
  const [fromYear, setFromYear] = useState('');
  const [toYear, setToYear] = useState('');
  const [parameter, setParameter] = useState('');
  const [loading, setLoading] = useState(false);
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch states data when component mounts
    fetchStates();
  }, []);

  const fetchStates = async () => {
    try {
      // Mock API call to fetch states data
      const statesData = ['Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'HIMACHAL PRADESH', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'];
      setStates(statesData);
    } catch (error) {
      console.error('Error fetching states:', error);
    }
  };

  const fetchDistricts = async (selectedState) => {
    try {
      // Mock API call to fetch districts based on the selected state
      // Replace this with your actual API call
      let districtsData = [];
      if (selectedState === 'HIMACHAL PRADESH') {
        districtsData = ['LAHUL & SPITI', 'KULLU'];
      } else if (selectedState === 'Uttar Pradesh') {
        districtsData = ['Shahjahanpur'];
      }
      setDistricts(districtsData);
    } catch (error) {
      console.error('Error fetching districts:', error);
    }
  };

  // Generate an array of years from 1901 to 2002
  const years = [];
  for (let i = 1901; i <= 2002; i++) {
    years.push(i);
  }




const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError(null);

  try {
    const formData = {
      state,
      district,
      fromYear,
      toYear,
      parameter
    };

    const response = await fetch('http://localhost:5000/api/weather/generateData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    console.log(response);

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await response.json();
    // console.log(data);
    onDataReceived(data);
    // Process the retrieved data (e.g., display it on the frontend)
    
    // renderLineChart(data);
  } 

  catch (error) {
    console.error('Error fetching data:', error);
    setError('Failed to fetch data. Please try again.');
  } 

  finally {
    setLoading(false);
  }
};


// const renderLineChart = (data) => {
//   // Example D3.js code to render line chart
//   const svg = d3.select('svg');

//   // Extracting months and corresponding data from the response data
//   const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
//   const monthData = months.map((month) => ({
//     month,
//     value: data[month], // Assuming data is stored by month name (e.g., 'Jan', 'Feb', etc.)
//   }));

//   // Define chart dimensions
//   const margin = { top: 20, right: 30, bottom: 30, left: 40 };
//   const width = 600 - margin.left - margin.right;
//   const height = 400 - margin.top - margin.bottom;

//   // Define scales
//   const x = d3.scaleBand()
//     .domain(months)
//     .range([margin.left, width - margin.right])
//     .padding(0.1);

//   const y = d3.scaleLinear()
//     .domain([0, d3.max(monthData, d => d.value)])
//     .nice()
//     .range([height - margin.bottom, margin.top]);

//   // Define line
//   const line = d3.line()
//     .x(d => x(d.month) + x.bandwidth() / 2)
//     .y(d => y(d.value));

//   // Draw x-axis
//   svg.append('g')
//     .attr('transform', `translate(0,${height - margin.bottom})`)
//     .call(d3.axisBottom(x));

//   // Draw y-axis
//   svg.append('g')
//     .attr('transform', `translate(${margin.left},0)`)
//     .call(d3.axisLeft(y));

//   // Draw line
//   svg.append('path')
//     .datum(monthData)
//     .attr('fill', 'none')
//     .attr('stroke', 'steelblue')
//     .attr('stroke-width', 1.5)
//     .attr('d', line);
// };

  return (
    <>
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label htmlFor="state" className={styles.label}>State:</label>
          <select id="state" value={state} onChange={(e) => {
            setState(e.target.value);
            fetchDistricts(e.target.value);
          }} className={styles.selectField}>
            <option value="">Select State</option>
            {states.map((state, index) => (
              <option key={index} value={state}>{state}</option>
            ))}
          </select>

          <label htmlFor="district" className={styles.label}>District:</label>
          <select id="district" value={district} onChange={(e) => setDistrict(e.target.value)} className={styles.selectField}>
            <option value="">Select District</option>
            {districts.map((district, index) => (
              <option key={index} value={district}>{district}</option>
            ))}
          </select>

          <label htmlFor="fromYear" className={styles.label}>From:</label>
          <select id="fromYear" value={fromYear} onChange={(e) => setFromYear(e.target.value)} className={styles.selectField}>
            <option value="">Select Year</option>
            {years.map((year, index) => (
              <option key={index} value={year}>{year}</option>
            ))}
          </select>

          <label htmlFor="toYear" className={styles.label}>To:</label>
          <select id="toYear" value={toYear} onChange={(e) => setToYear(e.target.value)} className={styles.selectField}>
            <option value="">Select Year</option>
            {years.map((year, index) => (
              <option key={index} value={year}>{year}</option>
            ))}
          </select>

          <label htmlFor="parameter" className={styles.label}>Date type:</label>
          <select id="parameter" value={parameter} onChange={(e) => setParameter(e.target.value)} className={styles.selectField}>
            <option value="">Select Date Type</option>
            <option value="precipitation">Precipitation</option>
            {/* Add other data types as needed */}
          </select>

          <button type="submit" disabled={loading} className={styles.submitButton}>{loading ? 'Loading...' : 'Generate Chart'}</button>
        </form>

        {error && <p className={styles.error}>{error}</p>}
      </div>
    </div>
    

    {/* <Chart /> */}
    </>
  );
};

export default Form;
