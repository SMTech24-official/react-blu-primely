import { io, Socket } from "socket.io-client";
import { useEffect, useState } from "react";

const useSocket = (userId: string) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io(`http://localhost:5000?token=${userId}`, {
      withCredentials: true,
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [userId]);

  return socket;
};

export default useSocket;
