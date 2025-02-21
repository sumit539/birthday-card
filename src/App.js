// import Card from "./card1";
// import "./tulip1.css";

// export default function App() {
//   return (
//     <div className="App">
//       <Card />
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import Card from "./card1";
import "./tulip1.css";
import { logPageView } from "./pageTracker"; // Import tracking function

export default function App() {
    const [views, setViews] = useState(0);
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        logPageView().then(data => {
            if (data) {
                setViews(data.views);
                setLogs(data.logs);
            }
        });
    }, []);

    return (
        <div className="App">
            <Card />
            <div className="analytics">
                <h3>Page Views: {views}</h3>
                <h4>Recent Logs</h4>
                <ul>
                    {logs.slice(-5).map((log, index) => (
                        <li key={index}>
                            {log.timestamp} - IP: {log.ip}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
