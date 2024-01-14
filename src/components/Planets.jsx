import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Planet from "../Planet";

const fetchPlanets = async (key, page) => {
  const res = await fetch(`http://swapi.dev/api/planets/?page=${page}`);
  return res.json();
};

function Planets() {
  const [page, setPage] = useState(1);
  const { data, status } = useQuery({
    queryKey: ["planets", 2],
    queryFn: fetchPlanets,
  });
  console.log(data);

  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <h2>Planets</h2>

      <button onClick={()=> setPage(1)}>1</button>
      <button onClick={()=> setPage(2)} >2</button>
      <button onClick={()=>setPage(3)} >3</button>
      {Loading && <div>Loading data...</div>}
      {status === "error" && <div>Error fetching data</div>}
      {status === "success" && (
        <div>
          {data.results.map((planet) => (
            <Planet key={planet.name} planet={planet} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Planets;
