// import React, { createContext, useState, useEffect } from 'react';
// import axios from 'axios';

// const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//   const [auth, setAuth] = useState(false);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     axios.get('http://localhost:3307/check-auth')
//       .then(res => {
//         if (res.data.status === "Success") {
//           setAuth(true);
//         } else {
//           setAuth(false);
//         }
//       })
//       .catch(err => {
//         console.error('Error checking auth:', err);
//         setAuth(false);
//       })
//       .finally(() => setLoading(false));
//   }, []);

//   return (
//     <AuthContext.Provider value={{ auth, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export { AuthContext, AuthProvider };
import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get('http://localhost:3307/check-auth', {
                    withCredentials: true
                });
                setAuth(response.data);
            } catch (error) {
                console.error("Error checking auth:", error);
                setAuth(null);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ auth, loading }}>
            {children}
        </AuthContext.Provider>
    );
};


