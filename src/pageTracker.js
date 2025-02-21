const binUrl = "https://api.jsonbin.io/v3/b/67b89ee0acd3cb34a8eb4f64";
const apiKey = "$2a$10$SjZwuogGpIK.W8u7CM0KkuYfBCbavh1ZT3VWBM0evnZAfo9Vq0Yce"; 

export const logPageView = async () => {
    try {
        console.log("Fetching JSONBin data...");

        // Fetch current data
        const response = await fetch(binUrl, {
            headers: { "X-Master-Key": apiKey }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Raw JSON response:", data);

        // Check if 'record' exists
        if (!data || !data.record) {
            throw new Error("Invalid response format: 'record' is missing");
        }

        let newViews = (data.record.views || 0) + 1;
        let timestamp = new Date().toISOString();
        let userIP = await getUserIP();

        let newLogEntry = { ip: userIP, timestamp };
        let updatedLogs = [...(data.record.logs || []), newLogEntry];

        // Update JSONBin
        const updateResponse = await fetch(binUrl, {
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

        if (!updateResponse.ok) {
            throw new Error(`Update failed! Status: ${updateResponse.status}`);
        }

        console.log("Updated data successfully:", { views: newViews, logs: updatedLogs });
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
