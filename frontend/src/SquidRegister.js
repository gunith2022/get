// // 
// import React, { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { AuthContext } from "./AuthContext";
// import { load } from "@cashfreepayments/cashfree-js";
// import { Button } from "react-bootstrap";

// function SquidRegister() {
//     const { auth, loading } = useContext(AuthContext);
//     const [hasTicket, setHasTicket] = useState(false);
//     const [eventLoading, setEventLoading] = useState(true);
//     const [orderId, setOrderId] = useState("");
//     const [cashfree, setCashfree] = useState(null);

//     useEffect(() => {
//         const initializeSDK = async () => {
//             const cashfreeInstance = await load({
//                 mode: "sandbox",
//             });
//             setCashfree(cashfreeInstance);
//         };
//         initializeSDK();
//     }, []);

//     useEffect(() => {
//         const checkIfUserBoughtTicket = async () => {
//             try {
//                 if (!auth) {
//                     setEventLoading(false);
//                     return;
//                 }
//                 const response = await axios.post('http://localhost:3307/api/check-ticket', { eventName: 'SquidGame' }, { withCredentials: true });
//                 setHasTicket(response.data.hasTicket);
//             } catch (error) {
//                 console.error("Error checking ticket status", error);
//             } finally {
//                 setEventLoading(false);
//             }
//         };

//         checkIfUserBoughtTicket();
//     }, [auth]);

//     const getSessionId = async () => {
//         try {
//             const res = await axios.get("http://localhost:3307/payment", { withCredentials: true });
//             if (res.data && res.data.payment_session_id) {
//                 console.log(res.data);
//                 setOrderId(res.data.order_id);
//                 return res.data.payment_session_id;
//             }
//         } catch (error) {
//             console.error("Error getting session ID", error);
//         }
//     };

//     const verifyPayment = async () => {
//         try {
//             const res = await axios.post("http://localhost:3307/verify", { orderId: orderId }, { withCredentials: true });
//             if (res && res.data) {
//                 alert("Payment verified");
//             }
//         } catch (error) {
//             console.error("Error verifying payment", error);
//         }
//     };

//     const handleProceedToPay = async (e) => {
//         e.preventDefault();
//         if (hasTicket) {
//             alert("You have already bought the ticket.");
//         } else {
//             try {
//                 const sessionId = await getSessionId();
//                 const checkoutOptions = {
//                     paymentSessionId: sessionId,
//                     redirectTarget: "_modal",
//                 };
//                 cashfree.checkout(checkoutOptions).then((res) => {
//                     console.log("Payment initialized");
//                     verifyPayment();
//                 });
//             } catch (error) {
//                 console.error("Error during payment process", error);
//             }
//         }
//     };

//     if (loading || eventLoading) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div className="container mt-4">
//             <div className="row">
//                 <div className="col-md-8 offset-md-2">
//                     <div className="card">
//                         <div className="card-header bg-primary text-white">
//                             <h2 className="card-title">Squid Game</h2>
//                             <p className="card-text">Player 456 or Player 001?</p>
//                         </div>
//                         <div className="card-body">
//                             <p className="card-text">Registration Fee - 200/-</p>
//                             <p className="card-text">Max. Limit 4 Members</p>
//                             <p className="card-text">Prize Money - 5000/-</p>
//                             <Button
//                                 onClick={handleProceedToPay}
//                                 variant="primary"
//                                 className="mt-3"
//                             >
//                                 Proceed to Pay
//                             </Button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default SquidRegister;
// import React, { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { AuthContext } from "./AuthContext";
// import { load } from "@cashfreepayments/cashfree-js";
// import { Button } from "react-bootstrap";

// function SquidRegister() {
//     const { auth, loading } = useContext(AuthContext);
//     const [hasTicket, setHasTicket] = useState(false);
//     const [eventLoading, setEventLoading] = useState(true);
//     const [orderId, setOrderId] = useState("");
//     const [cashfree, setCashfree] = useState(null);

//     useEffect(() => {
//         const initializeSDK = async () => {
//             const cashfreeInstance = await load({
//                 mode: "sandbox",
//             });
//             setCashfree(cashfreeInstance);
//         };
//         initializeSDK();
//     }, []);

//     useEffect(() => {
//         const checkIfUserBoughtTicket = async () => {
//             try {
//                 if (!auth) {
//                     setEventLoading(false);
//                     return;
//                 }
//                 const response = await axios.post('http://localhost:3307/api/check-ticket', { eventName: 'squidgame' }, { withCredentials: true });
//                 setHasTicket(response.data.hasTicket);
//             } catch (error) {
//                 console.error("Error checking ticket status", error);
//             } finally {
//                 setEventLoading(false);
//             }
//         };

//         checkIfUserBoughtTicket();
//     }, [auth]);

//     const getSessionId = async () => {
//         try {
//             const res = await axios.get("http://localhost:3307/payment", { withCredentials: true });
//             if (res.data && res.data.payment_session_id) {
//                 console.log(res.data);
//                 setOrderId(res.data.order_id);
//                 return res.data.payment_session_id;
//             }
//         } catch (error) {
//             console.error("Error getting session ID", error);
//         }
//     };

//     const verifyPayment = async () => {
//         try {
//             const res = await axios.post("http://localhost:3307/verify", { orderId: orderId, eventName: 'squidgame' }, { withCredentials: true });
//             if (res && res.data) {
//                 alert("Payment verified");
//                 // Optionally, update state or perform other actions upon successful verification
//             }
//         } catch (error) {
//             console.error("Error verifying payment", error);
//         }
//     };

//     const handleProceedToPay = async (e) => {
//         e.preventDefault();
//         if (hasTicket) {
//             alert("You have already bought the ticket.");
//         } else {
//             try {
//                 const sessionId = await getSessionId();
//                 const checkoutOptions = {
//                     paymentSessionId: sessionId,
//                     redirectTarget: "_modal",
//                 };
//                 cashfree.checkout(checkoutOptions).then((res) => {
//                     console.log("Payment initialized");
//                     verifyPayment();
//                 });
//             } catch (error) {
//                 console.error("Error during payment process", error);
//             }
//         }
//     };

//     if (loading || eventLoading) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div className="container mt-4">
//             <div className="row">
//                 <div className="col-md-8 offset-md-2">
//                     <div className="card">
//                         <div className="card-header bg-primary text-white">
//                             <h2 className="card-title">Squid Game</h2>
//                             <p className="card-text">Player 456 or Player 001?</p>
//                         </div>
//                         <div className="card-body">
//                             <p className="card-text">Registration Fee - 200/-</p>
//                             <p className="card-text">Max. Limit 4 Members</p>
//                             <p className="card-text">Prize Money - 5000/-</p>
//                             <Button
//                                 onClick={handleProceedToPay}
//                                 variant="primary"
//                                 className="mt-3"
//                             >
//                                 Proceed to Pay
//                             </Button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default SquidRegister;
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import { load } from "@cashfreepayments/cashfree-js";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import CustomNavbar from "./Navbar"; // Import the CustomNavbar component
import './SquidRegister.css'; // Import the CSS file for additional styling

function SquidRegister() {
    const { auth, loading } = useContext(AuthContext);
    const [hasTicket, setHasTicket] = useState(false);
    const [eventLoading, setEventLoading] = useState(true);
    const [orderId, setOrderId] = useState("");
    const [cashfree, setCashfree] = useState(null);

    useEffect(() => {
        const initializeSDK = async () => {
            try {
                const cashfreeInstance = await load({ mode: "sandbox" });
                setCashfree(cashfreeInstance);
            } catch (error) {
                console.error("Error initializing Cashfree SDK", error);
            }
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
                const response = await axios.post('http://localhost:3307/api/check-ticket', { eventName: 'squidgame' }, { withCredentials: true });
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
                setOrderId(res.data.order_id);
                return res.data.payment_session_id;
            }
        } catch (error) {
            console.error("Error getting session ID", error);
        }
    };

    const verifyPayment = async () => {
        try {
            const res = await axios.post("http://localhost:3307/verify", { orderId: orderId, eventName: 'squidgame' }, { withCredentials: true });
            if (res && res.data) {
                alert("Payment verified");
                // Optionally, update state or perform other actions upon successful verification
            }
        } catch (error) {
            console.error("Error verifying payment", error);
        }
    };

    const handleProceedToPay = async (e) => {
        e.preventDefault();
        if (hasTicket) {
            alert("You have already bought the ticket.");
            return;
        }
        try {
            const sessionId = await getSessionId();
            const checkoutOptions = {
                paymentSessionId: sessionId,
                redirectTarget: "_modal",
            };
            cashfree.checkout(checkoutOptions).then(() => {
                console.log("Payment initialized");
                verifyPayment();
            });
        } catch (error) {
            console.error("Error during payment process", error);
        }
    };

    if (loading || eventLoading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <CustomNavbar /> {/* Include the navbar */}
            <Container className="squid-register-container mt-4">
                <Row className="justify-content-md-center">
                    <Col md={8}>
                        <Card className="text-center">
                            <Card.Header className="bg-DARK text-white">
                                <h2 className="card-title ">Squid Game</h2>
                                <p className="card-text">Player 456 or Player 001?</p>
                            </Card.Header>
                            <Card.Body>
                                <Card.Text>Registration Fee - 200/-</Card.Text>
                                <Card.Text>Max. Limit 4 Members</Card.Text>
                                <Card.Text>Prize Money - 5000/-</Card.Text>
                                <Button
                                    onClick={handleProceedToPay}
                                    variant="primary"
                                    className="mt-3"
                                >
                                    Proceed to Pay
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default SquidRegister;
