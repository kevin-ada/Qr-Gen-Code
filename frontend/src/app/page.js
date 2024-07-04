"use client"
import React, { useState, useEffect, useRef } from "react";
import Button from "@/components/Button";
import Input from "@/components/Input";

export default function Home() {
  const [url, setUrl] = useState("");
  const [qrCode, setQrCode] = useState(null);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const generateQRCode = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/qr/api/create/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ link: url }),
      });
      const data = await response.json();
      console.log("Backend response:", data);  // Log the response to check the returned data
      if (isMounted.current) {
        setQrCode(data.qr_code);
      }
    } catch (error) {
      console.error("Error generating QR code:", error);
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center space-y-6 p-8 bg-gradient-to-br from-[#0d324d] to-[#7f5a83]"
      style={{ minHeight: '100vh', minWidth: '100vw' }}
    >
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold text-white">QR Code Generator</h1>
        <p className="text-muted-foreground text-white">Enter a link or URL to generate a QR code.</p>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          generateQRCode();
        }}
        className="flex w-full max-w-md items-center space-x-2"
      >
        <Input
          type="url"
          placeholder="Enter a link or URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="peer w-full h-full bg-white text-gray-950 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
        />
        <Button
          className={'bg-orange-500 hover:bg-orange-600 text-gray-200 font-bold py-2 px-4 rounded-full'}
          type="submit"
        >
          Generate
        </Button>
      </form>
      {qrCode && (
        <img
          src={`http://127.0.0.1:8000/media/${qrCode}`}
          alt="QR Code"
          onError={(e) => {
            console.error("Image load error:", e);
          }}
        />
      )}
    </div>
  );
}
