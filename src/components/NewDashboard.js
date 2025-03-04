import React, { useEffect, useState } from "react";
import LiveChart from "./LiveChart";

export const NewDashboard = () => {
  const [In, setIn] = useState(null);
  const [Height, setHeight] = useState(null);
  const [Weight, setWeight] = useState(null);
  const [Temperature, SetTemperature] = useState(null);
  const [HeartRate, setHeartRate] = useState(null);
  const [Spo2, setSpo2] = useState(null);


  const controls = {
    show: true,
    download: true,
    selection: false,
    zoom: false,
    zoomin: true,
    zoomout: true,
    pan: true,
    reset: true,
    zoomEnabled: true,
    autoSelected: "zoom",
  };

  useEffect(() => {
    const fetchData = async () => {
      const url =
        "https://api.thingspeak.com/channels/2862580/feeds.json?api_key=FJYU01DTYWN910WO";

      try {
        const res = await fetch(url);
        const data = await res.json();
        console.log("Fetched Data:", data);

        if (data?.feeds?.length > 0) {
          const xAxis = data.feeds.map((feed) => new Date(feed.created_at).getTime());

          setIn({
            "x-axis": xAxis,
            "y-axis": data.feeds.map((feed) => feed.field2),
            color: "green",
            seriesName: "in",
          });

          setHeight({
            "x-axis": xAxis,
            "y-axis": data.feeds.map((feed) => feed.field3),
            color: "blue",
            seriesName: "height",
          });

          setWeight({
            "x-axis": xAxis,
            "y-axis": data.feeds.map((feed) => feed.field4),
            color: "#ff4f4f",
            seriesName: "weight",
          });
          SetTemperature({
            "x-axis": xAxis,
            "y-axis": data.feeds.map((feed) => feed.field5),
            color: "#ff4f4f",
            seriesName: "temperature",
          });
          setHeartRate({
            "x-axis": xAxis,
            "y-axis": data.feeds.map((feed) => feed.field6),
            color: "#ff4f4f",
            seriesName: "heart rate",
          });
          setSpo2({
            "x-axis": xAxis,
            "y-axis": data.feeds.map((feed) => feed.field7),
            color: "#ff4f4f",
            seriesName: "spo2",
          });

        }
      } catch (error) {
        console.error("Error fetching data from ThingSpeak:", error);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 5000);

    return () => clearInterval(intervalId);
  }, []);

  if (!In || !Weight || !Height || !Temperature || !HeartRate || !Spo2) {
    return <div className="text-center text-lg font-semibold text-gray-600">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6 bg-green-100">
      <h1 className="text-center text-black font-bold text-2xl mb-6">
      Anganwadi health monitor
      </h1>

      {/* Charts Section */}
      <div className=" flex-wrap flex justify-center gap-10">
        {/* Combined Chart */}
        <div className="flex justify-center">
          <div className="bg-gray-100  w-[350px] sm:w-[600px]  shadow-lg rounded-lg p-5">
            <h2 className="text-center text-lg font-semibold text-gray-800 mb-4">IN / Out</h2>
            <LiveChart
              data={[In]}
              title="IN / Out"
              lineStyle="stepline"
              lineWidth={1}
              chartType="line"
              controls={controls}
            />
          </div>
        </div>


        {/* LightingValue Chart */}
        <div className="flex justify-center">
          <div className="bg-gray-100 w-[350px] sm:w-[600px] shadow-lg rounded-lg p-5">
            <h2 className="text-center text-lg font-semibold text-gray-800 mb-4">Weight</h2>
            <LiveChart
              data={[Weight]}
              title={Weight.seriesName}
              lineStyle="straight"
              lineWidth={1}
              chartType="line"
              controls={controls}
            />
          </div>
        </div>


        {/* Spark Chart */}
        <div className="flex justify-center">
          <div className="bg-gray-100 w-[350px] sm:w-[600px] shadow-lg rounded-lg p-5">
            <h2 className="text-center text-lg font-semibold text-gray-800 mb-4">Height</h2>
            <LiveChart
              data={[Height]}
              title={Height.seriesName}
              lineStyle="smooth"
              lineWidth={1}
              chartType="line"
              controls={controls}
            />
          </div>
        </div>


        {/* Current Chart */}
        <div className="flex justify-center">
          <div className="bg-gray-100 w-[350px] sm:w-[600px] shadow-lg rounded-lg p-5 ">
            <h2 className="text-center text-lg font-semibold text-gray-800 mb-4">Temperature</h2>
            <LiveChart
              data={[Temperature]}
              title={Temperature.seriesName}
              lineStyle="straight"
              lineWidth={1}
              chartType="line"
              controls={controls}

            />
          </div>
        </div>

        {/* Voltage Chart */}
        <div className="flex justify-center">
          <div className="bg-gray-100 w-[350px] sm:w-[600px]  shadow-lg rounded-lg p-5 ">
            <h2 className="text-center text-lg font-semibold text-gray-800 mb-4">HeartRate</h2>
            <LiveChart
              data={[HeartRate]}
              title={HeartRate.seriesName}
              lineStyle="straight"
              lineWidth={1}
              chartType="line"
              controls={controls}

            />
          </div>
        </div>

        {/* GroundResistance Chart */}
        <div className="flex justify-center ">
          <div className="bg-gray-100 w-[350px] sm:w-[600px] shadow-lg rounded-lg p-5 ">
            <h2 className="text-center text-lg font-semibold text-gray-800 mb-4">Spo2</h2>
            <LiveChart
              data={[Spo2]}
              title={Spo2.seriesName}
              lineStyle="straight"
              lineWidth={1}
              chartType="line"
              controls={controls}

            />
          </div>
        </div>
      </div>
    </div>
  );
};



