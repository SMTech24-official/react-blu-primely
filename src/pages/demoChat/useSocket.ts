import { io, Socket } from "socket.io-client";
import { useEffect, useRef, useState } from "react";

const useSocket = (userId: string) => {
  const socketRef = useRef<Socket | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Only create the socket if it doesn't exist
    if (!socketRef.current) {
      console.log("Creating new socket connection");
      socketRef.current = io(`http://localhost:5000?token=${userId}`, {
        withCredentials: true,
        autoConnect: true, // This is true by default
      });

      // Add connection event listeners for debugging
      socketRef.current.on("connect", () => {
        setIsLoading(true);
        console.log("Socket connected", socketRef.current?.id);
      });

      socketRef.current.on("disconnect", () => {
        console.log("Socket disconnected");
      });

      socketRef.current.on("connect_error", (err) => {
        console.error("Connection error:", err);
      });
    }

    // Cleanup function
    return () => {
      // Only disconnect if the userId changes (component unmount or userId changes)
      if (socketRef.current) {
        console.log("Cleaning up socket connection");
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [userId]); // Only recreate if userId changes

  return { socket: socketRef.current, isLoading };
};

export default useSocket;
