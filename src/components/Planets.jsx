import React, { useEffect, useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import Planet from "../Planet";

const fetchPlanets = async (page) => {
  const res = await fetch(`http://swapi.dev/api/planets/?page=${page}`);
  return res.json();
};

function Planets() {
  const [page, setPage] = useState(1);
  const { data, status, isPlaceholderData } = useQuery({
    queryKey: ["planets", page],
    queryFn: fetchPlanets,
    placeholderData: keepPreviousData,
  });
  console.log(data);

  const [Loading, SetLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      SetLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <h2>Planets</h2>

      {Loading && <div>Loading data...</div>}
      {status === "error" && <div>Error fetching data</div>}
      {status === "success" && (
        <div>
          <>
            <button
              onClick={() => setPage((old) => Math.max(old - 1, 1))}
              disabled={page === 0}
            >
              Previous Page
            </button>
            <span>{page}</span>
            <button
              onClick={() =>
                setPage((old) =>
                  data && !isPlaceholderData && data.next ? old + 1 : old
                )
              }
            >
              Next Page
            </button>

            {data.results.map((planet) => (
              <Planet key={planet.name} planet={planet} />
            ))}
          </>
        </div>
      )}
    </div>
  );
}

export default Planets;
