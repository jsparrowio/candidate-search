// import all dependencies
import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { searchGithub, searchGithubUser } from '../api/API';
import CandCard from '../components/CandCard';
import Candidate from '../interfaces/Candidate.interface';
import 'react-toastify/dist/ReactToastify.css';

// CandidateSearch function, which is the default exported function which will render the candidate search page utilizing the CandCard component
const CandidateSearch = () => {
  // selectedCand variable, which uses useState to be able to dynamically change which candidate is selected
  const [selectedCand, setSelectedCand] = useState<Candidate | null>(null);

  // load data from GitHub APIs on inital page load, but only do this once so that we do not create duplicate API calls when a candidate is accepted or denied
  useEffect(() => {
    loadData()
  }, []);

  // function that utlizies GitHub API calls to first pull a list of candidates, then pull information about the first candidate on the list
  // if there are any errors when retrieving data, console.error the error(s) and return
  const getCandidates = async () => {
    try {
      const candList = await searchGithub();
      if (candList.length > 0) {
        const candInfo = await searchGithubUser(candList[0].login);
        if (candInfo) {
          setSelectedCand(candInfo);
          console.log(candInfo);
          return;
        } else {
          console.error('Candidate not found');
          return;
        }
      } else {
        console.error('No candidates found on GH');
        setSelectedCand(null);
        return;
      }
    } catch (err: any) {
      console.error('Promise error getting candidates: ', err)
    }
  }

  // loadData function, which first shows a loading toast to let the user know the promise is pending, and then calls the getCandidates function to retrieve data
  const loadData = async function () {
    toast.dismiss();
    await toast.promise(
      getCandidates,
      {
        pending: 'Getting candidate...',
        success: 'Candidate retrieved!',
        error: 'There was an error getting candidates...'
      }
    );
  }

  // function to save an approved candidate to localStorage, then run the loadData function to retrieve a new candidate
  function saveCandidate() {
    const savedCandidates = JSON.parse(localStorage.getItem("savedCandidates") || "[]");
    savedCandidates.push(selectedCand);
    localStorage.setItem("savedCandidates", JSON.stringify(savedCandidates));
    loadData();
  }

  // return the page, which renders the toast notification and candidate card
  return (
    <div>
      <ToastContainer
        position="top-center"
      />
      <h1>Candidate Search</h1>
      {selectedCand && (
        <CandCard
          cand={selectedCand}
          approve={saveCandidate}
          deny={loadData}
        />)}
    </div>
  )
};

// export entire function to be utilized elsewhere
export default CandidateSearch;