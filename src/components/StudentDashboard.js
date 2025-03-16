// import React, { useEffect, useState, useContext } from 'react';
// import Chart from 'react-apexcharts';
// import { DContext } from '../context/Datacontext';


// const StudentDashboard = () => {
//   const { Auth } = useContext(DContext);
//   // Extract the student id from the auth object stored in context
//   const loggedInStudentId = Auth?.studentId;
//   const [feeds, setFeeds] = useState([]);
    

//   // Wait until the student id is available before fetching
//   useEffect(() => {
//     if (!loggedInStudentId) return;
//     fetch('https://api.thingspeak.com/channels/2864896/feeds.json?api_key=08PKEB79Z453CTIV')
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.feeds) {
//           // Only include feeds that match the logged in student's id (field1)
//           const filteredFeeds = data.feeds.filter(
//             (feed) => feed.field1 === loggedInStudentId
//           );
//           setFeeds(filteredFeeds);
//         }
//       })
//       .catch((error) => console.error("Error fetching data:", error));
//   }, [loggedInStudentId]);

//   if (feeds.length === 0) {
//     return <div>Loading...</div>;
//   }

//   // For charts, consider only those feeds with non-empty health data in field3
//   const healthFeeds = feeds.filter(feed => feed.field3 && feed.field3.trim() !== "");

//   // Prepare data arrays for health metrics: weight, height, temperature, heart rate, spo2
//   const weightData = [];
//   const heightData = [];
//   const temperatureData = [];
//   const heartRateData = [];
//   const spo2Data = [];

//   healthFeeds.forEach(feed => {
//     const time = feed.created_at ? new Date(feed.created_at).getTime() : null;
//     if (!time) return;
//     const values = feed.field3.split(',');
//     if (values.length !== 5) return;
//     const [weight, height, temperature, heartRate, spo2] = values.map(val => parseFloat(val) || 0);
//     weightData.push({ x: time, y: weight });
//     heightData.push({ x: time, y: height });
//     temperatureData.push({ x: time, y: temperature });
//     heartRateData.push({ x: time, y: heartRate });
//     spo2Data.push({ x: time, y: spo2 });
//   });

//   // Sorting data points by time (ascending)
//   weightData.sort((a, b) => a.x - b.x);
//   heightData.sort((a, b) => a.x - b.x);
//   temperatureData.sort((a, b) => a.x - b.x);
//   heartRateData.sort((a, b) => a.x - b.x);
//   spo2Data.sort((a, b) => a.x - b.x);

//   const commonOptions = {
//     chart: { type: 'line', zoom: { enabled: true } },
//     stroke: {
//       curve: 'smooth',    // Makes the line smooth (optional)
//       width: 1            // Sets the line width to 3 pixels
//     },
//     colors: ['#FF5733'],  // Sets the line color to a specific hex value
//     xaxis: { type: 'datetime' }
//   };

//   // Chart configurations for each health metric
//   const charts = [
//     {
//       title: 'Weight Over Time',
//       series: [{ name: 'Weight', data: weightData }],
//       options: { ...commonOptions, title: { text: 'Weight Over Time' } }
//     },
//     {
//       title: 'Height Over Time',
//       series: [{ name: 'Height', data: heightData }],
//       options: { ...commonOptions, title: { text: 'Height Over Time' } }
//     },
//     {
//       title: 'Temperature Over Time',
//       series: [{ name: 'Temperature', data: temperatureData }],
//       options: { ...commonOptions, title: { text: 'Temperature Over Time' } }
//     },
//     {
//       title: 'Heart Rate Over Time',
//       series: [{ name: 'Heart Rate', data: heartRateData }],
//       options: { ...commonOptions, title: { text: 'Heart Rate Over Time' } }
//     },
//     {
//       title: 'SPO2 Over Time',
//       series: [{ name: 'SPO2', data: spo2Data }],
//       options: { ...commonOptions, title: { text: 'SPO2 Over Time' } }
//     }
//   ];


 


//   return (
//     <div className="container mx-auto p-4">
   
//         <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>
    
      
//       <div className="overflow-x-auto">
//         <table className="min-w-full border-collapse border border-gray-300">
//           <thead>
//             <tr className="bg-gray-200">
//               <th className="border border-gray-300 p-2">S.No</th>
//               <th className="border border-gray-300 p-2">User ID</th>
//               <th className="border border-gray-300 p-2">Attendance</th>
//               <th className="border border-gray-300 p-2 hidden md:table-cell">Time</th>
//             </tr>
//           </thead>
//           <tbody>
//             {feeds.map((entry, index) => {
//               const attendance = entry.field2 === "1" ? "IN" : entry.field2 === "0" ? "OUT" : "Unknown";
//               const time = entry.created_at ? new Date(entry.created_at).toLocaleString() : "N/A";
//               return (
//                 <tr key={entry.entry_id} className="text-center">
//                   <td className="border border-gray-300 p-2">{index + 1}</td>
//                   <td className="border border-gray-300 p-2">{entry.field1}</td>
//                   <td className="border border-gray-300 p-2">{attendance}</td>
//                   <td className="border border-gray-300 p-2 hidden md:table-cell">{time}</td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//       {/* Health charts section: shown only if there is valid health data */}
//       {healthFeeds.length > 0 && (
//         <div className="mt-8">
//           <h2 className="text-xl font-bold mb-4">Health Charts</h2>
//           <div className="flex flex-wrap w-full bg-stone-300 h-full rounded">
//             {charts.map((chartConfig, index) => (
//               <div key={index} className="w-full md:w-1/2 px-2 mb-4 bg-white">
//                 <Chart
//                   options={chartConfig.options}
//                   series={chartConfig.series}
//                   type="line"
//                   height={350}
//                 />
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default StudentDashboard;



// import React, { useEffect, useState, useContext } from 'react';
// import Chart from 'react-apexcharts';
// import { DContext } from '../context/Datacontext';

// const StudentDashboard = () => {
//   const { Auth } = useContext(DContext);
//   const loggedInStudentId = Auth?.studentId;
//   const [feeds, setFeeds] = useState([]);
//   console.log("feeds",feeds)
//   console.log("feeds",Auth)

//   useEffect(() => {
//     if (!loggedInStudentId) return;
  
//     const urls = [
//       'https://api.thingspeak.com/channels/2877835/feeds.json?api_key=X6W35RACSZEL05QJ',
//       'https://api.thingspeak.com/channels/2877948/feeds.json?api_key=M2YJQIMB0OZ3MJ8U',
//     ];
  
//     Promise.all(urls.map(url => fetch(url).then(res => res.json())))
//       .then((data) => {
//         console.log("API responses:", data);
  
// // Process API 1 with conversion logic for userId
// const api1Data = data[0].feeds
//   .map(feed => {
//     if (!feed.field1) return null;
//     const parts = feed.field1.split(',');
//     if (parts.length < 3) return null;
//     let [userId, height, weight] = parts;
//     userId = userId.trim();

//     // Conversion logic: if userId is "3E00F590BFE4", convert it to "VCEW1"
//     if (userId === "3E00F590BFE4") {
//       userId = "VCEW1";
//     }

//     return {
//       created_at: feed.created_at,
//       userId: userId,
//       height: parseFloat(height),
//       weight: parseFloat(weight)
//     };
//   })
//   .filter(item => item !== null);

// console.log("Processed API1 data:", api1Data);


  
//         // Process API 2
//         const api2Data = data[1].feeds.map(feed => ({
//           created_at: feed.created_at,
//           heartRate: parseFloat(feed.field1) || 0,
//           spo2: parseFloat(feed.field2) || 0,
//         }));
//         console.log("API2 data:", api2Data);
  
//         // Combine data based on index
//         const combinedLength = Math.min(api1Data.length, api2Data.length);
//         const combinedFeeds = [];
//         for (let i = 0; i < combinedLength; i++) {
//           combinedFeeds.push({
//             created_at: api1Data[i].created_at,
//             userId: api1Data[i].userId,
//             height: api1Data[i].height,
//             weight: api1Data[i].weight,
//             heartRate: api2Data[i].heartRate,
//             spo2: api2Data[i].spo2,
//           });
//         }
//         console.log("Combined data:", combinedFeeds);
  
//         setFeeds(combinedFeeds);
//       })
//       .catch((error) => console.error("Error fetching data:", error));
//   }, [loggedInStudentId]);
  
  

//   if (feeds.length === 0) {
//     return <div>Loading...</div>;
//   }

//   const healthFeeds = feeds.filter(feed => feed.field3 && feed.field3.trim() !== "");

//   const weightData = [];
//   const heightData = [];
//   const temperatureData = [];
//   const heartRateData = [];
//   const spo2Data = [];

//   healthFeeds.forEach(feed => {
//     const time = feed.created_at ? new Date(feed.created_at).getTime() : null;
//     if (!time) return;
//     const values = feed.field3.split(',');
//     if (values.length !== 5) return;
//     const [weight, height, temperature, heartRate, spo2] = values.map(val => parseFloat(val) || 0);
//     weightData.push({ x: time, y: weight });
//     heightData.push({ x: time, y: height });
//     temperatureData.push({ x: time, y: temperature });
//     heartRateData.push({ x: time, y: heartRate });
//     spo2Data.push({ x: time, y: spo2 });
//   });

//   const commonOptions = {
//     chart: { type: 'line', zoom: { enabled: true } },
//     stroke: {
//       curve: 'smooth',
//       width: 1,
//     },
//     colors: ['#FF5733'],
//     xaxis: { type: 'datetime' },
//   };

//   const charts = [
//     { title: 'Weight Over Time', series: [{ name: 'Weight', data: weightData }], options: { ...commonOptions, title: { text: 'Weight Over Time' } } },
//     { title: 'Height Over Time', series: [{ name: 'Height', data: heightData }], options: { ...commonOptions, title: { text: 'Height Over Time' } } },
//     { title: 'Temperature Over Time', series: [{ name: 'Temperature', data: temperatureData }], options: { ...commonOptions, title: { text: 'Temperature Over Time' } } },
//     { title: 'Heart Rate Over Time', series: [{ name: 'Heart Rate', data: heartRateData }], options: { ...commonOptions, title: { text: 'Heart Rate Over Time' } } },
//     { title: 'SPO2 Over Time', series: [{ name: 'SPO2', data: spo2Data }], options: { ...commonOptions, title: { text: 'SPO2 Over Time' } } },
//   ];

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>
//       <div className="overflow-x-auto">
//         <table className="min-w-full border-collapse border border-gray-300">
//           <thead>
//             <tr className="bg-gray-200">
//               <th className="border border-gray-300 p-2">S.No</th>
//               <th className="border border-gray-300 p-2">User ID</th>
//               <th className="border border-gray-300 p-2 hidden">Attendance</th>
//               <th className="border border-gray-300 p-2 hidden md:table-cell">Time</th>
//             </tr>
//           </thead>
//           <tbody>
//             {feeds.map((entry, index) => {
//               const attendance = entry.field2 === "1" ? "IN" : entry.field2 === "0" ? "OUT" : "Unknown";
//               const time = entry.created_at ? new Date(entry.created_at).toLocaleString() : "N/A";
//               return (
//                 <tr key={entry.entry_id} className="text-center">
//                   <td className="border border-gray-300 p-2">{index + 1}</td>
//                   <td className="border border-gray-300 p-2">{Auth.fullname}</td>
//                   <td className="border border-gray-300 p-2 hidden">{attendance}</td>
//                   <td className="border border-gray-300 p-2 hidden md:table-cell">{time}</td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//       {healthFeeds.length > 0 && (
//         <div className="mt-8">
//           <h2 className="text-xl font-bold mb-4">Health Charts</h2>
//           <div className="flex flex-wrap w-full bg-stone-300 h-full rounded">
//             {charts.map((chartConfig, index) => (
//               <div key={index} className="w-full md:w-1/2 px-2 mb-4 bg-white">
//                 <Chart
//                   options={chartConfig.options}
//                   series={chartConfig.series}
//                   type="line"
//                   height={350}
//                 />
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default StudentDashboard;




import React, { useEffect, useState, useContext } from 'react';
import Chart from 'react-apexcharts';
import { DContext } from '../context/Datacontext';

const StudentDashboard = () => {
  const { Auth } = useContext(DContext);
  const loggedInStudentId = Auth?.studentId;
  const [feeds, setFeeds] = useState([]);
  console.log("feeds", feeds);
  console.log("Auth", Auth);

  useEffect(() => {
    if (!loggedInStudentId) return;
  
    const urls = [
      'https://api.thingspeak.com/channels/2877835/feeds.json?api_key=X6W35RACSZEL05QJ',
      'https://api.thingspeak.com/channels/2877948/feeds.json?api_key=M2YJQIMB0OZ3MJ8U',
    ];
  
    Promise.all(urls.map(url => fetch(url).then(res => res.json())))
      .then((data) => {
        console.log("API responses:", data);
  
        // Process API 1 with conversion logic for userId
        const api1Data = data[0].feeds
          .map(feed => {
            if (!feed.field1) return null;
            const parts = feed.field1.split(',');
            if (parts.length < 3) return null;
            let [userId, height, weight] = parts;
            userId = userId.trim();
  
            // Conversion logic: if userId is "3E00F590BFE4", convert it to "VCEW1"
            if (userId === "3E00F590BFE4") {
              userId = "VCEW1";
            }
  
            return {
              created_at: feed.created_at,
              userId: userId,
              height: parseFloat(height),
              weight: parseFloat(weight)
            };
          })
          .filter(item => item !== null);
  
        console.log("Processed API1 data:", api1Data);
  
        // Process API 2: heartRate and spo2 data
        const api2Data = data[1].feeds.map(feed => ({
          created_at: feed.created_at,
          heartRate: parseFloat(feed.field1) || 0,
          spo2: parseFloat(feed.field2) || 0,
        }));
        console.log("API2 data:", api2Data);
  
// Combine data based on index using map (assuming both arrays are equal)
const combinedFeeds = api1Data.map((feed, index) => ({
  created_at: feed.created_at,
  userId: feed.userId,
  height: feed.height,
  weight: feed.weight,
  heartRate: api2Data[index].heartRate,
  spo2: api2Data[index].spo2,
}));

console.log("Combined data:", combinedFeeds);
  
        setFeeds(combinedFeeds);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [loggedInStudentId]);
  
  if (feeds.length === 0) {
    return <div>Loading...</div>;
  }
  
  // Generate chart data arrays from the combined feeds
  const weightData = [];
  const heightData = [];
  const heartRateData = [];
  const spo2Data = [];
  console.log("spo2",spo2Data)
  
  
  feeds.forEach(feed => {
    const time = feed.created_at ? new Date(feed.created_at).getTime() : null;
    if (!time) return;
    weightData.push({ x: time, y: feed.weight });
    heightData.push({ x: time, y: feed.height });
    heartRateData.push({ x: time, y: feed.heartRate });
    spo2Data.push({ x: time, y: feed.spo2 });
  });
  
  // Sort each array by time (ascending)
  weightData.sort((a, b) => a.x - b.x);
  heightData.sort((a, b) => a.x - b.x);
  heartRateData.sort((a, b) => a.x - b.x);
  spo2Data.sort((a, b) => a.x - b.x);
  
  const commonOptions = {
    chart: { type: 'line', zoom: { enabled: true } },
    stroke: {
      curve: 'smooth',
      width: 1,
    },
    colors: ['#FF5733'],
    xaxis: { type: 'datetime' },
  };
  
  const charts = [
    {
      title: 'Weight Over Time',
      series: [{ name: 'Weight', data: weightData }],
      options: { ...commonOptions, title: { text: 'Weight ' } }
    },
    {
      title: 'Height Over Time',
      series: [{ name: 'Height', data: heightData }],
      options: { ...commonOptions, title: { text: 'Height' } }
    },
    {
      title: 'Heart Rate Over Time',
      series: [{ name: 'Heart Rate', data: heartRateData }],
      options: { ...commonOptions, title: { text: 'Heart Rate ' } }
    },
    {
      title: 'SPO2 Over Time',
      series: [{ name: 'SPO2', data: spo2Data }],
      options: { ...commonOptions, title: { text: 'SPO2 ' } }
      
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
              <th className="border border-gray-300 p-2 hidden">Attendance</th>
              <th className="border border-gray-300 p-2 hidden md:table-cell">Time</th>
            </tr>
          </thead>
          <tbody>
            {feeds.map((entry, index) => {
              const time = entry.created_at ? new Date(entry.created_at).toLocaleString() : "N/A";
              return (
                <tr key={index} className="text-center">
                  <td className="border border-gray-300 p-2">{index + 1}</td>
                  <td className="border border-gray-300 p-2">{Auth.fullname}</td>
                  <td className="border border-gray-300 p-2 hidden">N/A</td>
                  <td className="border border-gray-300 p-2 hidden md:table-cell">{time}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Health Charts</h2>
        <div className="w-full p-36   justify-center   bg-stone-300 h-full rounded-2xl">
          {charts.map((chartConfig, index) => (
            <div key={index} className="sm:w-full md:w-full lg:w-full px-2 mb-4 bg-white rounded-xl">
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
    </div>
  );
};

export default StudentDashboard;







