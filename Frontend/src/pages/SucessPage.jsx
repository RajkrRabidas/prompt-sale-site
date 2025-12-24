import { useEffect, useState, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE = "http://localhost:8000/api/v1";

export default function SuccessPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const orderId = searchParams.get("orderId");

  const [status, setStatus] = useState("PENDING");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const intervalRef = useRef(null);
  const attemptsRef = useRef(0);

  useEffect(() => {
    if (!orderId) {
      setError("Invalid payment reference.");
      setLoading(false);
      return;
    }

    const checkStatus = async () => {
      try {
        attemptsRef.current += 1;

        const res = await axios.get(`${API_BASE}/payment/status/${orderId}`, {
          timeout: 5000,
        });

        const paymentStatus = res.data?.status;

        if (!paymentStatus) {
          throw new Error("Invalid status response");
        }

        setStatus(paymentStatus);

        if (paymentStatus === "SUCCESS" || paymentStatus === "FAILED") {
          clearInterval(intervalRef.current);
          setLoading(false);
        }

        if (attemptsRef.current >= 10) {
          clearInterval(intervalRef.current);
          setLoading(false);
          setStatus("FAILED");
        }
      } catch (err) {
        console.error("Status check failed:", err.message || err);
      }
    };

    checkStatus();
    intervalRef.current = setInterval(checkStatus, 5000);
    return () => clearInterval(intervalRef.current);
  }, [orderId]);

  const maskId = (id = "") => {
    if (!id) return "•••• ••••";
    const visible = id.slice(-4);
    return `•••• •••• ${visible}`;
  };

  if (loading && status === "PENDING") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f3f5f6] p-5 font-sans">
        <div className="w-full max-w-[420px] bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-white">
            <button className="bg-transparent border-0 text-lg cursor-pointer" onClick={() => navigate(-1)}>&larr;</button>
            <div className="font-semibold">Payment Details</div>
            <div className="w-9" />
          </div>

          <div className="p-6 flex flex-col items-center gap-2">
            <h3 className="m-0">Verifying Payment…</h3>
            <p className="m-0 text-gray-500">Please wait, do not refresh.</p>
          </div>
        </div>
      </div>
    );
  }

  if (status === "SUCCESS") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f3f5f6] p-5 font-sans">
        <div className="w-full max-w-[420px] bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-white">
            <button className="bg-transparent border-0 text-lg cursor-pointer" onClick={() => navigate(-1)}>&larr;</button>
            <div className="font-semibold">Payment Details</div>
            <div className="w-9" />
          </div>

          <div className="p-4 flex flex-col gap-4">
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-b from-[#38b49b] to-[#0e7f73] flex items-center justify-center shadow-md">
                <svg width="42" height="42" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 6L9 17L4 12" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h2 className="mt-3">Payment Successful</h2>
              <div className="text-gray-500">Successfully paid</div>
            </div>

            <div className="bg-[#fafafa] rounded-md p-3 flex flex-col gap-2">
              <div className="text-xs text-gray-600 font-bold tracking-wider pl-1">DETAILS</div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100"><div className="text-gray-500 text-sm">Transaction ID</div><div className="text-gray-900 font-semibold text-sm">{maskId(orderId)}</div></div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100"><div className="text-gray-500 text-sm">Time</div><div className="text-gray-900 font-semibold text-sm"></div></div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100"><div className="text-gray-500 text-sm">Date</div><div className="text-gray-900 font-semibold text-sm">Jun 6, 2025</div></div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100"><div className="text-gray-500 text-sm">Payment Method</div><div className="text-gray-900 font-semibold text-sm">Visa Debit Card</div></div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100"><div className="text-gray-500 text-sm">Station Name</div><div className="text-gray-900 font-semibold text-sm">Electra Spot</div></div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100"><div className="text-gray-500 text-sm">Session ID</div><div className="text-gray-900 font-semibold text-sm">CHG1245678</div></div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100"><div className="text-gray-500 text-sm">Total Amount</div><div className="text-gray-900 font-semibold text-sm">$12.25</div></div>
            </div>

            <button className="mt-1 bg-[#0e7f73] text-white rounded-md px-4 py-3 cursor-pointer font-semibold" onClick={() => navigate("/")}>Done</button>
          </div>
        </div>
      </div>
    );
  }

  if (status === "FAILED") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f3f5f6] p-5 font-sans">
        <div className="w-full max-w-[420px] bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-white">
            <button className="bg-transparent border-0 text-lg cursor-pointer" onClick={() => navigate(-1)}>&larr;</button>
            <div className="font-semibold">Payment Details</div>
            <div className="w-9" />
          </div>

          <div className="p-6 flex flex-col items-center gap-2">
            <div className="w-18 h-18 rounded-full bg-[#e74c3c] flex items-center justify-center shadow-lg">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6l12 12" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2 className="mt-2 text-[#c0392b]">Payment Failed</h2>
            <p className="text-gray-500 max-w-[280px] text-center">If money was deducted, it will be auto-refunded. Try again or contact support.</p>

            <div className="flex gap-3 mt-4">
              <button className="mt-1 bg-transparent text-[#0e7f73] border border-[#dfecec] rounded-md px-3 py-2 cursor-pointer font-semibold" onClick={() => navigate(-1)}>Back</button>
              <button className="mt-1 bg-[#0e7f73] text-white rounded-md px-4 py-3 cursor-pointer font-semibold" onClick={() => navigate("/checkout")}>Try Again</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
