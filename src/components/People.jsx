import React from "react";
import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import Person from "./Person";

const fetchPeople = async () => {
  const res = await fetch("http://swapi.dev/api/people/");
  return res.json();
};

function People() {
  const { data, status } = useQuery({
    queryKey: ["people"],
    queryFn: fetchPeople,
  });
  console.log(data);
  const [Loading, SetLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      SetLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div>
      <h2>People</h2>
      {Loading && <div>Loading data...</div>}
      {status === "error" && <div>Error fetching data</div>}
      {status === "success" && (
        <div>
          {data.results.map((person) => (
            <Person key={person.name} person={person} />
          ))}
        </div>
      )}
    </div>
  );
}

export default People;
