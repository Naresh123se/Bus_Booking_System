import React, { useState, useEffect } from 'react';

function MyComponent() {
    const [schedule, setSchedule] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://septa.p.rapidapi.com/hackathon/BusSchedules/?req1=17842&req2=17&req3=i&req6=7", {
          method: "GET",
          headers: {
            "X-RapidAPI-Key": "5807d2f2acmsh2fe4009e3392c74p111629jsnbeee624f5911",
            "X-RapidAPI-Host": "septa.p.rapidapi.com"
          }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        // Assuming you want the StopName from the first item in the array
       console.log(data)

       const stopNames = data["17"].map(trip => trip.StopName);
      setSchedule(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    // Cleanup function
    return () => {
      // Any cleanup code if needed
    };
  }, []);
  const booking = schedule?.["17"]?.[0]?.date;
  const booking1 = schedule?.["17"]?.[1]?.date;
  const booking2 = schedule?.["17"]?.[2]?.date;
  const booking3 = schedule?.["17"]?.[3]?.date;
  const booking4 = schedule?.["17"]?.[4]?.date;
  const booking5 = schedule?.["17"]?.[5]?.date;
  const booking6 = schedule?.["17"]?.[6]?.date;

  return (
    <>
    <div>
      {booking}
    </div>
  </>
  );
}

export default MyComponent;
