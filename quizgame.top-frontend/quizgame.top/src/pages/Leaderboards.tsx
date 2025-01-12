import { useEffect, useState } from 'react';
import '../assets/css/Leaderboards.scss';
import * as constants from '../Constants';
import { FcInfo } from 'react-icons/fc';
import { Modal } from 'antd';

interface LeaderboardEntry {
  username: string;
  answerCount: number;
  correctCount: number;
  score: number;
}

const Leaderboards = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    setLoading(true)

    fetch(constants.leaderBoardEndpoint, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json',},
    })
    .then((response) => {
      if (response.ok) return response.json(); 

      return response.json().then((errorData) => {
        throw new Error(errorData.message || 'Fetch failed');
      });
    })
    .then((data) => {
      const table: LeaderboardEntry[] = data;
      setLeaderboard(table);
    })
    .catch((err: Error) => {
      setError(err.message || 'Failed to fetch leaderboard.');
    })
    .finally(() => {
      setLoading(false)
    });
  }, []);


  const calculateAccuracy = (correct: number, total: number) => {
    if(total == 0 || correct == 0) return '0%';
    return ((correct/total)*100).toFixed(2)+'%';
  }

  const infoModal =() => {
    Modal.info({ 
      content: <>The leaderboard shows the top 20 users by score.<br/>For each correct answer you get a point, but for each incorrect answer you lose a point.</>
    });
  }

  return (
    <div className='leaderboard-outer-container'>
      <div className='leaderboard-inner-container'>
        <div className='leaderboard-title'>Leaderboard <FcInfo className='leaderboard-info' onClick={infoModal}/></div>  
        <div className={`leaderboard-message ${loading}`}>Loading...</div>
        <div className={`leaderboard-message ${error != null}`}>Error: {error}</div>
        <table className={`leaderboard-table ${!loading && !error}`}>
          <thead>
            <tr className='leaderboard-table-header'>
              <th>Rank</th>
              <th>Username</th>
              <th>Score</th>
              <th>Accuracy</th>
              <th>Total Answers</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((entry, index) => (
              <tr className='leaderboard-body-row' key={entry.username}>
                <td>{index + 1}</td>
                <td>{entry.username}</td>
                <td>{entry.score}</td>
                <td>{calculateAccuracy(entry.correctCount, entry.answerCount)}</td>
                <td>{entry.answerCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div> 
  );
}

export default Leaderboards;