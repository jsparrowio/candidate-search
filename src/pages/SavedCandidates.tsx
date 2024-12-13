// import all dependencies
import { useState, useEffect } from "react";
import type Candidate from "../interfaces/Candidate.interface";

// SavedCandidates function, which is the default exported function which will render a table of saves candidates for review
const SavedCandidates = () => {

  // establish the array variable that will contain candidate objects
  const [savedCands, setSavedCands] = useState<Candidate[] | []>([]);

  // retrieve the currently stored candidate objects from local storage, but only on inital page load
  // if no stored candidate objects, set the state of the variable to contain an empty array
  useEffect(() => {
    setSavedCands(JSON.parse(localStorage.getItem("savedCandidates") || "[]"))
  },
    [])

  // if a candidate is rejected, set the savedCands array to filter out the rejected candidate, then remove that candidate from localStorage by storing updated array
  const rejectCandidate = (id: number) => {
    const updatedCands = savedCands.filter(
      (cand) => cand.id !== id
    );
    setSavedCands(updatedCands);
    localStorage.setItem("savedCandidates", JSON.stringify(updatedCands));
  };

  // return the Potential Candidates table
  return (
    <>
      <h1>Potential Candidates</h1>
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Location</th>
            <th>Email</th>
            <th>Company</th>
            <th>Bio</th>
            <th>Reject</th>
          </tr>
        </thead>
        <tbody>
          {savedCands.length > 0 ?
            savedCands.map((cand) => (
              <tr key={cand.id}>
                <td><a href={cand.html_url}><img src={cand.avatar_url !== null ? cand.avatar_url : ''} className="avatar" ></img></a></td>
                <td>{cand.name ? `${cand.name} (${cand.login})` : cand.login}</td>
                <td>{cand.location ? cand.location : 'N/A'}</td>
                <td>{cand.email ? (<a href={`mailto:${cand.email}`}>{cand.email}</a>) : 'N/A'}</td>
                <td>{cand.company ? cand.company : 'N/A'}</td>
                <td>{cand.bio ? cand.bio : 'N/A'}</td>
                <td><button className='approval-button button-minus' onClick={() => rejectCandidate(cand.id)}>-</button></td>
              </tr>
            ))
            :
            (
              <tr>
                <td colSpan={7} style={{ textAlign: "center" }}>No candidates saved!</td>
              </tr>
            )}
        </tbody>
      </table>
    </>
  );
};

// export entire function to be utilized elsewhere
export default SavedCandidates;
