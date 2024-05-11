import React , { useEffect, useState} from 'react';
import axios from 'axios';
import './style.css'

function Rankings(){
    const [rankings, setRankings] = useState([]);
    const [visibleCount, setVisibleCount] = useState(0);

    useEffect(() => {
        axios.get('http://127.0.0.1:5001/api/rankings')
            .then(response => {
                setRankings(response.data);
                setVisibleCount(0);
            })
            .catch(error => {
                console.error("Error: Data acquisition failed", error);
            });
    }, []);

    useEffect(() => {
        if(visibleCount < rankings.length){
            const timer = setTimeout(() => {
                setVisibleCount(visibleCount+ 1);
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [visibleCount, rankings]);

    return (
        <div>
            <h1>Ga Kai Otokogi Race Ranking 2024</h1>
            <table>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Name</th>
                        <th>Point(Yen)</th>
                    </tr>
                </thead>
                <tbody>
                    {rankings.slice(0, visibleCount).map((item, index) => (
                        <tr key={index}>
                            <td>{item.rank}</td>
                            <td>{item.player_name}</td>
                            <td>{item.score}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Rankings;