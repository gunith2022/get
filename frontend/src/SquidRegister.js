import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import { load } from "@cashfreepayments/cashfree-js";

function SquidRegister() {
    const { auth, loading } = useContext(AuthContext);
    const [hasTicket, setHasTicket] = useState(false);
    const [eventLoading, setEventLoading] = useState(true);
    const [orderId, setOrderId] = useState("");
    const [cashfree, setCashfree] = useState(null);

    useEffect(() => {
        const initializeSDK = async () => {
            const cashfreeInstance = await load({
                mode: "sandbox",
            });
            setCashfree(cashfreeInstance);
        };
        initializeSDK();
    }, []);

    useEffect(() => {
        const checkIfUserBoughtTicket = async () => {
            try {
                if (!auth) {
                    setEventLoading(false);
                    return;
                }
                const response = await axios.post('http://localhost:3307/api/check-ticket', { eventName: 'SquidGame' }, { withCredentials: true });
                setHasTicket(response.data.hasTicket);
            } catch (error) {
                console.error("Error checking ticket status", error);
            } finally {
                setEventLoading(false);
            }
        };

        checkIfUserBoughtTicket();
    }, [auth]);

    const getSessionId = async () => {
        try {
            const res = await axios.get("http://localhost:3307/payment", { withCredentials: true });
            if (res.data && res.data.payment_session_id) {
                console.log(res.data);
                setOrderId(res.data.order_id);
                return res.data.payment_session_id;
            }
        } catch (error) {
            console.error("Error getting session ID", error);
        }
    };

    const verifyPayment = async () => {
        try {
            const res = await axios.post("http://localhost:3307/verify", { orderId: orderId }, { withCredentials: true });
            if (res && res.data) {
                alert("Payment verified");
            }
        } catch (error) {
            console.error("Error verifying payment", error);
        }
    };

    const handleProceedToPay = async (e) => {
        e.preventDefault();
        if (hasTicket) {
            alert("You have already bought the ticket.");
        } else {
            try {
                const sessionId = await getSessionId();
                const checkoutOptions = {
                    paymentSessionId: sessionId,
                    redirectTarget: "_modal",
                };
                cashfree.checkout(checkoutOptions).then((res) => {
                    console.log("Payment initialized");
                    verifyPayment();
                });
            } catch (error) {
                console.error("Error during payment process", error);
            }
        }
    };

    if (loading || eventLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif', backgroundColor: '#f0f0f0', padding: '20px' }}>
            <div style={{ backgroundColor: '#d63384', color: 'white', padding: '20px' }}>
                <h1>Squid Game</h1>
                <p>Player 456 or Player 001?</p>
            </div>
            <div style={{ margin: '20px auto', width: '80%', maxWidth: '600px', backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                <p style={{ fontSize: '18px' }}>Registration Fee - 200/-</p>
                <p style={{ fontSize: '18px' }}>Max. Limit 4 Members</p>
                <p style={{ fontSize: '18px' }}>Prize Money - 5000/-</p>
                <p style={{ fontSize: '18px' }}></p>
                <button
                    onClick={handleProceedToPay}
                    style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                >
                    Proceed to Pay
                </button>
            </div>
        </div>
    );
}

export default SquidRegister;



