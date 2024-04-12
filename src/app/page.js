// src/pages/index.js
"use client"
import { useState } from 'react';
import Head from 'next/head';
import Form from './components/Form'; // Adjust the path as needed
import Chart from './components/Chart'; // Adjust the path as needed

export default function Home() {

  const [responseData, setResponseData] = useState(null); // State to store response data

  const handleDataReceived = (data) => {
    setResponseData(data); // Update state with the response data
  };


  return (
    <div>
      <Head>
        <title>Weather Data Visualization</title>
        <meta name="description" content="Generate charts based on meteorological datasets" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1><center>Weather Data Visualization</center></h1>
        <Form onDataReceived={handleDataReceived}/> {/* Render Form component */}
      </main>
      <Chart responseData={responseData}/> {/* Render Chart component */}

      <footer>
        {/* Footer content */}
      </footer>
    </div>
  );
}
