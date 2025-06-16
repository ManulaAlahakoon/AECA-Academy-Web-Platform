const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// export const apiFetch = async (endpoint, options = {}) => {
//     const res = await fetch(`${BASE_URL}${endpoint}`, {
//       ...options,
//       headers: {
//         'Content-Type': 'application/json',
//         ...(options.headers || {}),
//       },
//     });
  
//     // Instead of parsing JSON here,
//     // just return the full Response object
//     return res;
//   };
  // src/services/api.js



// export const apiFetch = async (endpoint, options = {}) => {
//   const res = await fetch(`${BASE_URL}${endpoint}`, {
//     ...options,
//     headers: {
//       'Content-Type': 'application/json',
//       ...(options.headers || {}),
//     },
//   });

//   const data = await res.json().catch(() => ({})); // in case it's not JSON

//   if (!res.ok) {
//     // Throw an error with the backend message or fallback
//     throw new Error(data.message || 'Something went wrong');
//   }

//   return data;
// };

// export const apiFetch = async (endpoint, options = {}) => {
//   const token = localStorage.getItem("token"); // Retrieve token from localStorage

//   const res = await fetch(`${BASE_URL}${endpoint}`, {
//     ...options,
//     headers: {
//       'Content-Type': 'application/json',
//       ...(token && { 'Authorization': `Bearer ${token}` }), // Attach Authorization header if token exists
//       ...(options.headers || {}),
//     },
//   });

//   const data = await res.json().catch(() => ({})); // In case it's not JSON

//   if (!res.ok) {
//     // Throw an error with the backend message or fallback
//     throw new Error(data.message || 'Something went wrong');
//   }

//   return data;
// };


export const apiFetch = async (endpoint, options = {}) => {
  const token = localStorage.getItem("token");
  const headers = {
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...(options.headers || {})
  };

  // Only set 'Content-Type' to JSON if body is NOT FormData
  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || 'Something went wrong');
  }
  return data;
};
