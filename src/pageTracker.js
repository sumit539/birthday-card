const binUrl = "https://api.jsonbin.io/v3/b/67b89ee0acd3cb34a8eb4f64";
const apiKey = "$2a$10$SjZwuogGpIK.W8u7CM0KkuYfBCbavh1ZT3VWBM0evnZAfo9Vq0Yce"; 

export const logPageView = async () => {
    try {
        // Fetch current data from JSONBin
        const response = await fetch(binUrl, {
            headers: { "X-Master-Key": apiKey }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Tracking page view..."); // For debugging

        // Ensure `record` exists
        if (!data || !data.record) {
            throw new Error("Invalid response format: 'record' is missing");
        }

        let newViews = (data.record.views || 0) + 1;
        let timestamp = new Date().toISOString();
        let userIP = await getUserIP();
        let deviceInfo = getDeviceInfo(); // Get device details

        let newLogEntry = { ip: userIP, timestamp, ...deviceInfo };
        let updatedLogs = [...(data.record.logs || []), newLogEntry];

        // Update JSONBin (store the new view count and logs)
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

    } catch (error) {
        console.error("Error logging page view:", error);
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

// Function to get device info (OS, browser, device type)
const getDeviceInfo = () => {
    const userAgent = navigator.userAgent;
    let deviceType = "Desktop";

    if (/Mobi|Android|iPhone|iPad|iPod/.test(userAgent)) {
        deviceType = "Mobile";
    }

    let browser = "Unknown Browser";
    if (userAgent.includes("Firefox")) browser = "Firefox";
    else if (userAgent.includes("Chrome")) browser = "Chrome";
    else if (userAgent.includes("Safari")) browser = "Safari";
    else if (userAgent.includes("Edge")) browser = "Edge";
    else if (userAgent.includes("Opera") || userAgent.includes("OPR")) browser = "Opera";

    let os = "Unknown OS";
    if (userAgent.includes("Win")) os = "Windows";
    else if (userAgent.includes("Mac")) os = "MacOS";
    else if (userAgent.includes("Linux")) os = "Linux";
    else if (userAgent.includes("Android")) os = "Android";
    else if (userAgent.includes("iOS") || userAgent.includes("iPhone") || userAgent.includes("iPad")) os = "iOS";

    return { os, browser, deviceType };
};
