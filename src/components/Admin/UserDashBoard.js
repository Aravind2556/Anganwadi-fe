// import React, { useEffect, useState } from 'react';
// import Chart from 'react-apexcharts';
// import { FaEye, FaTimes } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';

// export const UserDashBoard = () => {
//   const [feeds, setFeeds] = useState([]);
//   const [selectedFeed, setSelectedFeed] = useState(null);
//   const naviagte = useNavigate()



//   // Fetch all feed data
//   useEffect(() => {
//     fetch('https://api.thingspeak.com/channels/2864896/feeds.json?api_key=08PKEB79Z453CTIV')
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.feeds) {
//           console.log("Data feeds:", data.feeds);
//           setFeeds(data.feeds);
//         }
//       })
//       .catch((error) => console.error("Error fetching data:", error));
//   }, []);

//   // Open modal with selected user data
//   const handleEyeClick = (feed) => {
//     setSelectedFeed(feed);
//   };

//   const closeModal = () => {
//     setSelectedFeed(null);
//   };

//   if (feeds.length === 0) {
//     return <div>Loading...</div>;
//   }

//   const handleCreate = () => {
//     naviagte('/CreateUser')

//   }

//   return (
//     <div className="container mx-auto p-4">
//     <div className=" flex justify-around">
//       <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>
//       <button className="border rounded bg-stone-600 p-2 text-white font-bold text-2xl" onClick={handleCreate}>Create User</button>
//       </div>
//       <div className="overflow-x-auto">
//         <table className="min-w-full border-collapse border border-gray-300">
//           <thead>
//             <tr className="bg-gray-200">
//               <th className="border border-gray-300 p-2">S.No</th>
//               <th className="border border-gray-300 p-2">User ID</th>
//               <th className="border border-gray-300 p-2">Attendance</th>
//               <th className="border border-gray-300 p-2 hidden md:table-cell">Time</th>
//               <th className="border border-gray-300 p-2">Details</th>
//             </tr>
//           </thead>
//           <tbody>
//             {feeds.map((entry, index) => {
//               const userId = entry.field1;
//               const field2 = entry.field2;
//               // Attendance: 1 => "IN", 0 => "OUT"
//               const attendance = field2 === "1" ? "IN" : field2 === "0" ? "OUT" : "Unknown";
//               const time = entry.created_at ? new Date(entry.created_at).toLocaleString() : "N/A";

//               return (
//                 <tr key={entry.entry_id} className="text-center">
//                   <td className="border border-gray-300 p-2">{index + 1}</td>
//                   <td className="border border-gray-300 p-2">{userId}</td>
//                   <td className="border border-gray-300 p-2">{attendance}</td>
//                   <td className="border border-gray-300 p-2 hidden md:table-cell">{time}</td>
//                   <td className="border border-gray-300 p-2">
//                     <button onClick={() => handleEyeClick(entry)} title="View Details">
//                       <FaEye className="text-stone-600 hover:text-blue-700" />
//                     </button>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>

//       {/* Modal to show only health charts */}
//       {selectedFeed && (
//         <Modal 
//           selectedFeed={selectedFeed} 
//           feeds={feeds} 
//           closeModal={closeModal} 
//         />
//       )}
//     </div>
//   );
// };

// const Modal = ({ selectedFeed, feeds, closeModal }) => {
//   // Filter feeds for the selected user which have field3 data (health metrics)
//   const userHealthFeeds = feeds.filter(feed => feed.field1 === selectedFeed.field1 && feed.field3);

//   // Prepare data arrays for health metrics: weight, height, temperature, heart rate, spo2
//   const weightData = [];
//   const heightData = [];
//   const temperatureData = [];
//   const heartRateData = [];
//   const spo2Data = [];

//   userHealthFeeds.forEach(feed => {
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
//       curve: 'smooth',    
//       width: 1           
//     },
//     colors: ['#FF5733'],  
//     xaxis: { type: 'datetime' }
//   };

//   // Chart configurations for health metrics
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
//     // Modal overlay with a semi-transparent backdrop
    
//     <div className="fixed inset-0   flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
//       <div className="bg-white p-4 top-32 rounded-md relative w-11/12 md:w-2/3 overflow-y-auto max-h-screen">
//         <button onClick={closeModal} className="absolute top-2 right-2">
//           <FaTimes className="text-gray-600 hover:text-gray-800" />
//         </button>
//         <h2 className="text-xl font-bold mb-4">Health Charts for {selectedFeed.field1}</h2>
//         {userHealthFeeds.length > 0 ? (
//           <div className="flex flex-wrap w-full bg-stone-200 h-full rounded">
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
//         ) : (
//           <p>No historical health data available.</p>
//         )}
//       </div>
//     </div>
  
//   );
// };

// export default UserDashBoard;


import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

const UserDashBoard = () => {
  const [feeds, setFeeds] = useState([]);

  useEffect(() => {
    const urls = [
      'https://api.thingspeak.com/channels/2877835/feeds.json?api_key=X6W35RACSZEL05QJ',
      'https://api.thingspeak.com/channels/2877948/feeds.json?api_key=M2YJQIMB0OZ3MJ8U',
    ];

    Promise.all(urls.map(u => fetch(u).then(r => r.json())))
      .then(([api1, api2]) => {
        // API1: expect field1 = "userId,in,out,height,weight"
        const api1Data = api1.feeds
          .map(f => {
            if (!f.field1) return null;
            const parts = f.field1.split(',');
            if (parts.length < 5) return null;
            let [uid, i, o, h, w] = parts.map(p => p.trim());

            // convert raw IDs
            if (uid === '3E00F590BFE4') uid = 'VCEW1';
            if (uid === '190060B2C902') uid = 'VCEW2';

            return {
              created_at: f.created_at,
              userId:    uid,
              in:        parseFloat(i) || 0,
              out:       parseFloat(o) || 0,
              height:    parseFloat(h) || 0,
              weight:    parseFloat(w) || 0,
            };
          })
          .filter(x => x);

        // API2: heartRate + spo2
        const api2Data = api2.feeds.map(f => ({
          created_at: f.created_at,
          heartRate:  parseFloat(f.field1) || 0,
          spo2:       parseFloat(f.field2) || 0,
        }));

        // merge by index
        const combined = api1Data.map((f, idx) => ({
          ...f,
          heartRate: api2Data[idx]?.heartRate ?? 0,
          spo2:      api2Data[idx]?.spo2 ?? 0,
        }));

        setFeeds(combined);
      })
      .catch(console.error);
  }, []);

  if (!feeds.length) return <div>Loading...</div>;

  // build & sort each series
  const mkSeries = (key) =>
    feeds
      .map(f => ({ x: new Date(f.created_at).getTime(), y: f[key] }))
      .sort((a, b) => a.x - b.x);

  const inData        = mkSeries('in');
  const outData       = mkSeries('out');
  const weightData    = mkSeries('weight');
  const heightData    = mkSeries('height');
  const heartRateData = mkSeries('heartRate');
  const spo2Data      = mkSeries('spo2');

  // only last 5 points
  const recentIn        = inData.slice(-5);
  const recentOut       = outData.slice(-5);
  const recentWeight    = weightData.slice(-5);
  const recentHeight    = heightData.slice(-5);
  const recentHeartRate = heartRateData.slice(-5);
  const recentSpo2      = spo2Data.slice(-5);

  const commonOptions = {
    chart: { type: 'line', zoom: { enabled: true } },
    stroke: { curve: 'smooth', width: 1 },
    xaxis: { type: 'datetime' },
  };

  const charts = [
    { title: 'IN ',        series: [{ name: 'In',    data: recentIn }],        options: commonOptions },
    { title: 'OUT',       series: [{ name: 'Out',   data: recentOut }],       options: commonOptions },
    { title: 'Weight',    series: [{ name: 'Weight',data: recentWeight }],   options: commonOptions },
    { title: 'Height',    series: [{ name: 'Height',data: recentHeight }],   options: commonOptions },
    { title: 'Heart Rate',series: [{ name: 'HR',    data: recentHeartRate }],options: commonOptions },
    { title: 'SPO2',      series: [{ name: 'SpO2',  data: recentSpo2 }],     options: commonOptions },
  ];

  // table: last 5 records, newest-first
  const latestFive = [...feeds]
    .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
    .slice(-5)
    .reverse();

  return (
    <div className="container mx-auto p-10">
      <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>

      {/* Charts */}
      <section className="grid gap-4 p-10 bg-stone-300 rounded mb-8">
      <h2 className="text-xl font-bold mb-4">Users Chart</h2>
        {charts.map((cfg, i) => (
          <div key={i} className="bg-white w-full p-5 flex rounded-xl shadow">
            <h2 className="text-lg font-semibold mb-2">{cfg.title}</h2>
            <Chart
              options={cfg.options}
              series={cfg.series}
              type="line"
              height={250}
              className="w-full"
             
            />
          </div>
        ))}
      </section>

      {/* Table */}
      <section>
        <h2 className="text-xl font-bold mb-4">Users Data </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                {['S.No','User ID','In','Out','Weight','Height','SpO2','Heart Rate','Time']
                  .map((h, i) => <th key={i} className="border p-2">{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {latestFive.map((r, i) => (
                <tr key={i} className="text-center">
                  <td className="border p-2">{i+1}</td>
                  <td className="border p-2">{r.userId}</td>
                  <td className="border p-2">{r.in}</td>
                  <td className="border p-2">{r.out}</td>
                  <td className="border p-2">{r.weight}</td>
                  <td className="border p-2">{r.height}</td>
                  <td className="border p-2">{r.spo2}</td>
                  <td className="border p-2">{r.heartRate}</td>
                  <td className="border p-2">{new Date(r.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default UserDashBoard;
