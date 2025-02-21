const binUrl = "https://api.jsonbin.io/v3/b/YOUR_BIN_ID";
const apiKey = "$2a$10$SjZwuogGpIK.W8u7CM0KkuYfBCbavh1ZT3VWBM0evnZAfo9Vq0Yce"; 

export const logPageView = async () => {
    try {
        // Fetch current data
        const response = await fetch(binUrl, {
            headers: { "X-Master-Key": apiKey }
        });
        const data = await response.json();
        
        let newViews = data.record.views + 1;
        let timestamp = new Date().toISOString(); // Current time
        let userIP = await getUserIP(); // Fetch user IP

        // Add new log entry
        let newLogEntry = { ip: userIP, timestamp };
        let updatedLogs = [...data.record.logs, newLogEntry];

        // Update JSONBin
        await fetch(binUrl, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "X-Master-Key": apiKey
            },
            body: JSON.stringify({
                views: newViews,
                logs: updatedLogs
            })
        });

        return { views: newViews, logs: updatedLogs };
    } catch (error) {
        console.error("Error logging page view:", error);
        return null;
    }
};

// Function to get user's IP address
const getUserIP = async () => {
    try {
        const res = await fetch("https://api64.ipify.org?format=json");
        const data = await res.json();
        return data.ip;
    } catch (error) {
        console.error("Could not fetch IP:", error);
        return "Unknown IP";
    }
};
