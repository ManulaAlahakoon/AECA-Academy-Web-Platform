const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
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

/// Mostly right one for form image uploads

// export const apiFetch = async (endpoint, options = {}) => {
//   const token = localStorage.getItem("token");
//   const headers = {
//     ...(token && { 'Authorization': `Bearer ${token}` }),
//     ...(options.headers || {})
//   };

//   // Only set 'Content-Type' to JSON if body is NOT FormData
//   if (!(options.body instanceof FormData)) {
//     headers['Content-Type'] = 'application/json';
//   }

//   const res = await fetch(`${BASE_URL}${endpoint}`, {
//     ...options,
//     headers
//   });

//   const data = await res.json().catch(() => ({}));
//   if (!res.ok) {
//     throw new Error(data.message || 'Something went wrong');
//   }
//   return data;
// };

// export const apiFetch = async (endpoint, options = {}) => {
//   const token = localStorage.getItem("token");

//   const res = await fetch(`${BASE_URL}${endpoint}`, {
//     ...options,
//     headers: {
//       "Content-Type": "application/json",
//       ...(token && { "Authorization": `Bearer ${token}` }),
//       ...(options.headers || {})
//     },
//   });

//   if (!res.ok) {
//     const errorData = await res.json().catch(() => ({}));
//     if (res.status === 403 && errorData.message?.includes("disabled")) {
//       alert(errorData.message);
//       localStorage.removeItem("token"); // Clear the token
//       localStorage.removeItem("user"); // Clear user data
//       window.location.href = "/login"; // Redirect to login
//     }
//     throw new Error(errorData.message || "Something went wrong");
//   }

//   return res.json();
// };
export const apiFetch = async (endpoint, options = {}) => {
  const token = localStorage.getItem("token");
  const headers = {
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...(options.headers || {})
  };
  
  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await res.json().catch(() => ({}));

  // if (!res.ok) {
  //   if (res.status === 403 && data.message?.includes("disabled")) {
  //     alert(data.message);
  //     localStorage.removeItem("token"); // Clear the token
  //     localStorage.removeItem("user"); // Clear user data
  //     window.location.href = "/login"; // Redirect to login
  //   }
  //   throw new Error(data.message || "Something went wrong");
  // }

  if (!res.ok) {
  //  If account is disabled
  if (res.status === 403 && data.message?.includes("disabled")) {
    alert(data.message);
    localStorage.removeItem("token"); 
    localStorage.removeItem("user"); 
    window.location.href = "/login"; 
  }

  // If the token is invalid or expired
  if (res.status === 401) {
    alert(data.message || "Your session has expired. Please log in again.");
    localStorage.removeItem("token"); 
    localStorage.removeItem("user"); 
    window.location.href = "/login"; 
  }

  throw new Error(data.message || "Something went wrong");
}

  return data;
};


// export const apiPost = async (url, data, isFormData = false) => {
//   const token = localStorage.getItem("token");

//   const headers = isFormData
//     ? { Authorization: `Bearer ${token}` }
//     : {
//         "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//         "x-api-key": import.meta.env.VITE_API_KEY,
//       };

//   const response = await fetch(`${API_BASE}${url}`, {
//     method: "POST",
//     headers,
//     body: isFormData ? data : JSON.stringify(data),
//   });

//   if (!response.ok) {
//     const errorText = await response.text();
//     throw new Error(errorText);
//   }

//   return await response.json();
// };


export const apiPost = async (url, data, options = {}) => {
  const token = localStorage.getItem("token");
  const { isFormData = false, isAudio = false } = options;

  const headers = {
    Authorization: `Bearer ${token}`,
    "x-api-key": import.meta.env.VITE_API_KEY,
  };

  if (!isFormData && !isAudio) {
    headers["Content-Type"] = "application/json";
  }

  let body;
  if (isFormData) {
    body = data;
  } else if (isAudio) {
    body = data;
  } else {
    body = JSON.stringify(data);
  }

  const response = await fetch(`${API_BASE}${url}`, {
    method: "POST",
    headers: isFormData
      ? { Authorization: headers.Authorization, "x-api-key": headers["x-api-key"] }
      : headers,
    body,
  });

  if (!response.ok) {
    let errorData;
    try {
      errorData = await response.clone().json();
    } catch {
      errorData = await response.text();
    }
    throw new Error(JSON.stringify(errorData));
  }

  return await response.json(); // always JSON for /voice
};




export const apiDelete = async (endpoint) => {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

/*const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const apiFetch = async (endpoint, options = {}, role = 'user') => {
  const token = localStorage.getItem("token");
  const headers = {
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...(options.headers || {})
  };

  // Add role parameter to the endpoint
  const endpointWithRole = endpoint.includes('?') 
    ? `${endpoint}&role=${role}`
    : `${endpoint}?role=${role}`;

  // Only set 'Content-Type' to JSON if body is NOT FormData
  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  // Use endpointWithRole instead of endpoint in the fetch call
  const res = await fetch(`${BASE_URL}${endpointWithRole}`, {
    ...options,
    headers
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || 'Something went wrong');
  }
  return data;
};*/
