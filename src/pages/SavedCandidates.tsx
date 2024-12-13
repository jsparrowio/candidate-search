import { useState, useEffect } from "react";
import type Candidate from "../interfaces/Candidate.interface";
const SavedCandidates = () => {

  const [savedCands, setSavedCands] = useState<Candidate[] | []>([]);

  useEffect(() => {
    setSavedCands(JSON.parse(localStorage.getItem("savedCandidates") || "[]"))
  },
    [])

  const rejectCandidate = (id: number) => {
    const updatedCands = savedCands.filter(
      (cand) => cand.id !== id
    );
    setSavedCands(updatedCands);
    localStorage.setItem("savedCandidates", JSON.stringify(updatedCands));
  };

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
              <tr>
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

export default SavedCandidates;
