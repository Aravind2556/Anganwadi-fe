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
  console.log("feeds", feeds);
 

  useEffect(() => {
   
  
    // const urls = [
    //   'https://api.thingspeak.com/channels/2877835/feeds.json?api_key=X6W35RACSZEL05QJ',
    //   'https://api.thingspeak.com/channels/2877948/feeds.json?api_key=M2YJQIMB0OZ3MJ8U',
    // ];

    const urls = [
      'https://api.thingspeak.com/channels/2877835/feeds.json?api_key=X6W35RACSZEL05QJ',
      'https://api.thingspeak.com/channels/2877948/feeds.json?api_key=M2YJQIMB0OZ3MJ8U',
    ]
  
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

            if(userId === "190060B2C902"){
              userId = "VCEW2"
            }
  
            return {
              created_at: feed.created_at,
              userId: userId,
              height: parseFloat(height),
              weight: parseFloat(weight)
            };
          })
          .filter(item => item !== null);
  
     
  
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
  }, []);
  
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
    <h1 className="text-xl font-bold mb-4">Users Dashboard</h1>
          <div className="mt-8">
        <div className="w-full p-10 justify-center   bg-stone-300 h-full rounded-2xl">
        <h2 className="text-xl font-bold mb-4">Health Charts</h2>
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
      <h1 className="text-2xl font-bold mb-4">Users Table</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2">S.No</th>
              <th className="border border-gray-300 p-2">User ID</th>
              <th className="border border-gray-300 p-2">Weight</th>
              <th className="border border-gray-300 p-2">Hight</th>
              <th className="border border-gray-300 p-2">Spo2</th>
              <th className="border border-gray-300 p-2">Heart Rate</th>
              <th className="border border-gray-300 p-2 hidden">Attendance</th>
              <th className="border border-gray-300 p-2 hidden md:table-cell">Time</th>
            </tr>
          </thead>
          <tbody>
            {feeds.reverse().map((entry, index) => {
              const time = entry.created_at ? new Date(entry.created_at).toLocaleString() : "N/A";
              return (
                <tr key={index} className="text-center">
                  <td className="border border-gray-300 p-2">{index + 1}</td>
                  <td className="border border-gray-300 p-2">{entry.userId}</td>
                  <td className="border border-gray-300 p-2">{entry.weight}</td>
                  <td className="border border-gray-300 p-2">{entry.height}</td>
                  <td className="border border-gray-300 p-2">{entry.spo2}</td>
                  <td className="border border-gray-300 p-2">{entry.heartRate}</td>
                  <td className="border border-gray-300 p-2 hidden">N/A</td>
                  <td className="border border-gray-300 p-2 hidden md:table-cell">{time}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default UserDashBoard;

