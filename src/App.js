// import Card from "./card1";
// import "./tulip1.css";

// export default function App() {
//   return (
//     <div className="App">
//       <Card />
//     </div>
//   );
// }

import { useEffect } from "react";
import Card from "./card1";
import "./tulip1.css";
import { logPageView } from "./pageTracker"; // Import the tracking function

export default function App() {
    useEffect(() => {
        logPageView(); // Track visits silently in the background
    }, []);

    return (
        <div className="App">
            <Card />
        </div>
    );
}

// import { useEffect } from "react";
// import SunflowerCard from "./sunflowerCard"; // Import the new sunflower component
// import "./sunflower.css"; // Import the sunflower styles
// import { logPageView } from "./pageTracker"; // Tracking function

// export default function App() {
//   useEffect(() => {
//     logPageView(); // Track page view
//   }, []);

//   return (
//     <div className="App">
//       <SunflowerCard />
//     </div>
//   );
// }
