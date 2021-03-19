import React, { useEffect } from 'react';
import Head from 'next/head';
import { io } from 'socket.io-client';

export default function Chat() {
  useEffect(() => {
    const socket = io('http://localhost:3000');

    console.log(socket);
  });

  return (
    <div className="flex items-center justify-center h-screen bg-pink-500">
      <Head>
        <title>One Big Chat - Chat</title>
      </Head>
      <main className="shadow-md rounded-md p-72 bg-pink-400">
        <div></div>
        <div>
          <input className="rounded bg-gray-100 p-2 px-1 outline-none text-gray-400 bottom-0" />
        </div>
      </main>
    </div>
  );
}
