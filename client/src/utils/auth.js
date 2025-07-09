

export function isLoggedIn() {
  return !!localStorage.getItem("token");
}

export function getAuthInfo() {
  return {
    token: localStorage.getItem("token"),
    role: localStorage.getItem("role"),
    username: localStorage.getItem("username"),
  };
}

export function setAuthInfo({ token, role, username }) {
  if (token) localStorage.setItem("token", token);
  if (role) localStorage.setItem("role", role);
  if (username) localStorage.setItem("username", username);
  window.dispatchEvent(new Event("authChanged"));
}

export function clearAuthInfo() {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("username");
  window.dispatchEvent(new Event("authChanged"));
}
