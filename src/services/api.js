const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

function authHeader(token) {
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    const error = new Error(`API request failed (${response.status}) ${response.statusText}`);
    error.status = response.status;
    const text = await response.text();
    error.raw = text;
    try {
      error.details = text ? JSON.parse(text) : null;
    } catch (e) {
      error.details = null;
    }
    throw error;
  }

  return response.json();
}

export async function getPublicProfile() {
  return request('/public/profile', { method: 'GET' });
}

export async function trackVisit(payload) {
  return request('/track/visit', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function trackClick(payload) {
  return request('/track/click', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function adminLogin(email, password) {
  return request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export async function getAdminAnalytics(token) {
  return request('/admin/analytics', {
    method: 'GET',
    headers: authHeader(token),
  });
}

export async function getAdminProfile(token) {
  return request('/admin/profile', {
    method: 'GET',
    headers: authHeader(token),
  });
}

export async function updateAdminProfile(token, payload) {
  return request('/admin/profile', {
    method: 'PUT',
    headers: authHeader(token),
    body: JSON.stringify(payload),
  });
}

export async function getAdminLinks(token) {
  return request('/admin/links', {
    method: 'GET',
    headers: authHeader(token),
  });
}

export async function createAdminLink(token, payload) {
  return request('/admin/links', {
    method: 'POST',
    headers: authHeader(token),
    body: JSON.stringify(payload),
  });
}

export async function updateAdminLink(token, id, payload) {
  return request(`/admin/links/${id}`, {
    method: 'PUT',
    headers: authHeader(token),
    body: JSON.stringify(payload),
  });
}

export async function deleteAdminLink(token, id) {
  return request(`/admin/links/${id}`, {
    method: 'DELETE',
    headers: authHeader(token),
  });
}

export async function getAdminSocials(token) {
  return request('/admin/socials', {
    method: 'GET',
    headers: authHeader(token),
  });
}

export async function createAdminSocial(token, payload) {
  return request('/admin/socials', {
    method: 'POST',
    headers: authHeader(token),
    body: JSON.stringify(payload),
  });
}

export async function updateAdminSocial(token, id, payload) {
  return request(`/admin/socials/${id}`, {
    method: 'PUT',
    headers: authHeader(token),
    body: JSON.stringify(payload),
  });
}

export async function deleteAdminSocial(token, id) {
  return request(`/admin/socials/${id}`, {
    method: 'DELETE',
    headers: authHeader(token),
  });
}
