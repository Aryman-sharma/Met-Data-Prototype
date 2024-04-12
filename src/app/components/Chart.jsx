// Chart.jsx
"use client"
import { useRef, useEffect } from "react";
import * as d3 from 'd3';
import styles from './Chart.module.css';

function Chart({ responseData }) {
  const svgRef = useRef();
  const width = 500;
  const height = 300;
  console.log(responseData);

  useEffect(() => {
    // Remove any existing SVG elements
    d3.select(svgRef.current).selectAll("*").remove();
  
    if (responseData && Array.isArray(responseData.data)) { // Check if responseData and responseData.data exist
      const responseDataArray = responseData.data; // Extract the array from responseData.data
      // Extract years and corresponding data values
      const years = responseDataArray.map(entry => entry.year_val);
      const means = responseDataArray.map(entry => d3.mean(Object.values(entry).slice(6))); // Calculating mean of data from Jan to Dec
      
      // Create an SVG container
      const svg = d3.select(svgRef.current)
        .append('svg')
        .attr('width', width)
        .attr('height', height);
  
      // Define scales
      const xScale = d3.scaleBand()
        .domain(years.map(String))
        .range([0, width])
        .padding(0.1);
  
      const yScale = d3.scaleLinear()
        .domain([0, d3.max(means)])
        .nice()
        .range([height, 0]);
  
      // Add bars
      svg.selectAll('rect')
        .data(means)
        .enter()
        .append('rect')
        .attr('x', (d, i) => xScale(String(years[i])))
        .attr('y', (d) => yScale(d))
        .attr('width', xScale.bandwidth())
        .attr('height', (d) => height - yScale(d))
        .attr('fill', 'steelblue');
  
      // Add x-axis
      svg.append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(xScale))
        .append('text') // Add x-axis label
        .attr('x', width / 2)
        .attr('y', 40)
        .attr('text-anchor', 'middle')
        .text('Years');
  
      // Add y-axis
      svg.append('g')
        .call(d3.axisLeft(yScale))
        .append('text') // Add y-axis label
        .attr('transform', 'rotate(-90)')
        .attr('x', -height / 2)
        .attr('y', -40)
        .attr('text-anchor', 'middle')
        .text('Means');
    } else {
      // If data is null or undefined, render a message indicating no chart
      d3.select(svgRef.current)
        .append('div')
        .attr('class', 'no-data-message')
        .text('No data available');
    }
  }, [responseData]);
  

  return (
    <div className={styles.chartContainer}>
      <h2 className={styles.chartTitle}>Bar Chart</h2>
      <div ref={svgRef} className={styles.chart}></div>
    </div>
  );
}

export default Chart;
