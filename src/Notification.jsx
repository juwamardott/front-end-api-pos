import { useEffect, useState } from "react";
import axios from "axios";
import echo from "./echo";

export default function NotificationTester() {
  const [message, setMessage] = useState(null);

  useEffect(() => {
    // Listen to "notifications" channel
    echo.channel("notifications").listen(".new-notification", (e) => {
      console.log("Broadcast received:", e);
      setMessage(e.message);
    });
  }, []);

  const handleTrigger = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/test-broadcast"
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error triggering broadcast:", error);
    }
  };

  return (
    <div className="p-4">
      <button
        onClick={handleTrigger}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Kirim Broadcast
      </button>

      {message && (
        <div className="mt-4 bg-green-100 border border-green-400 text-green-700 p-2 rounded">
          Notifikasi masuk: {message}
        </div>
      )}
    </div>
  );
}
