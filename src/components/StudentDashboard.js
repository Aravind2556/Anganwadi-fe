import React, { useEffect, useState, useContext } from 'react';
import Chart from 'react-apexcharts';
                                        import { DContext } from '../context/Datacontext';


const StudentDashboard = () => {
  const { Auth } = useContext(DContext);
  // Extract the student id from the auth object stored in context
  const loggedInStudentId = Auth?.studentId;
  const [feeds, setFeeds] = useState([]);
    

  // Wait until the student id is available before fetching
  useEffect(() => {
    if (!loggedInStudentId) return;
    fetch('https://api.thingspeak.com/channels/2864896/feeds.json?api_key=08PKEB79Z453CTIV')
      .then((res) => res.json())
      .then((data) => {
        if (data.feeds) {
          // Only include feeds that match the logged in student's id (field1)
          const filteredFeeds = data.feeds.filter(
            (feed) => feed.field1 === loggedInStudentId
          );
          setFeeds(filteredFeeds);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [loggedInStudentId]);

  if (feeds.length === 0) {
    return <div>Loading...</div>;
  }

  // For charts, consider only those feeds with non-empty health data in field3
  const healthFeeds = feeds.filter(feed => feed.field3 && feed.field3.trim() !== "");

  // Prepare data arrays for health metrics: weight, height, temperature, heart rate, spo2
  const weightData = [];
  const heightData = [];
  const temperatureData = [];
  const heartRateData = [];
  const spo2Data = [];

  healthFeeds.forEach(feed => {
    const time = feed.created_at ? new Date(feed.created_at).getTime() : null;
    if (!time) return;
    const values = feed.field3.split(',');
    if (values.length !== 5) return;
    const [weight, height, temperature, heartRate, spo2] = values.map(val => parseFloat(val) || 0);
    weightData.push({ x: time, y: weight });
    heightData.push({ x: time, y: height });
    temperatureData.push({ x: time, y: temperature });
    heartRateData.push({ x: time, y: heartRate });
    spo2Data.push({ x: time, y: spo2 });
  });

  // Sorting data points by time (ascending)
  weightData.sort((a, b) => a.x - b.x);
  heightData.sort((a, b) => a.x - b.x);
  temperatureData.sort((a, b) => a.x - b.x);
  heartRateData.sort((a, b) => a.x - b.x);
  spo2Data.sort((a, b) => a.x - b.x);

  const commonOptions = {
    chart: { type: 'line', zoom: { enabled: true } },
    stroke: {
      curve: 'smooth',    // Makes the line smooth (optional)
      width: 1            // Sets the line width to 3 pixels
    },
    colors: ['#FF5733'],  // Sets the line color to a specific hex value
    xaxis: { type: 'datetime' }
  };

  // Chart configurations for each health metric
  const charts = [
    {
      title: 'Weight Over Time',
      series: [{ name: 'Weight', data: weightData }],
      options: { ...commonOptions, title: { text: 'Weight Over Time' } }
    },
    {
      title: 'Height Over Time',
      series: [{ name: 'Height', data: heightData }],
      options: { ...commonOptions, title: { text: 'Height Over Time' } }
    },
    {
      title: 'Temperature Over Time',
      series: [{ name: 'Temperature', data: temperatureData }],
      options: { ...commonOptions, title: { text: 'Temperature Over Time' } }
    },
    {
      title: 'Heart Rate Over Time',
      series: [{ name: 'Heart Rate', data: heartRateData }],
      options: { ...commonOptions, title: { text: 'Heart Rate Over Time' } }
    },
    {
      title: 'SPO2 Over Time',
      series: [{ name: 'SPO2', data: spo2Data }],
      options: { ...commonOptions, title: { text: 'SPO2 Over Time' } }
    }
  ];


 


  return (
    <div className="container mx-auto p-4">
   
        <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>
    
      
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2">S.No</th>
              <th className="border border-gray-300 p-2">User ID</th>
              <th className="border border-gray-300 p-2">Attendance</th>
              <th className="border border-gray-300 p-2 hidden md:table-cell">Time</th>
            </tr>
          </thead>
          <tbody>
            {feeds.map((entry, index) => {
              const attendance = entry.field2 === "1" ? "IN" : entry.field2 === "0" ? "OUT" : "Unknown";
              const time = entry.created_at ? new Date(entry.created_at).toLocaleString() : "N/A";
              return (
                <tr key={entry.entry_id} className="text-center">
                  <td className="border border-gray-300 p-2">{index + 1}</td>
                  <td className="border border-gray-300 p-2">{entry.field1}</td>
                  <td className="border border-gray-300 p-2">{attendance}</td>
                  <td className="border border-gray-300 p-2 hidden md:table-cell">{time}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* Health charts section: shown only if there is valid health data */}
      {healthFeeds.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Health Charts</h2>
          <div className="flex flex-wrap w-full bg-stone-300 h-full rounded">
            {charts.map((chartConfig, index) => (
              <div key={index} className="w-full md:w-1/2 px-2 mb-4 bg-white">
                <Chart
                  options={chartConfig.options}
                  series={chartConfig.series}
                  type="line"
                  height={350}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;









