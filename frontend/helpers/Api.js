const BACKEND_URI = process.env.NEXT_PUBLIC_BACKEND_URI;

const getCookieValue = (name) => document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || '';

/**
 * Authenticate user
 * @param {Object} params
 * @param {string} params.username
 * @param {string} params.password
 * @param {boolean} params.remember
 * @returns {JSON}
 * */
export const auth = async ({ username, password, remember }) => {
  const response = await fetch(`${BACKEND_URI}/auth`, {
    method: 'POST',
    body: JSON.stringify({
      username,
      password,
      remember,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  const data = await response.json();
  if (response.status !== 200) {
    throw new Error(data.message || 'API Error');
  }
  // set local PHPSESSID for external API calls because cookie blocked for cross-site response
  if (remember) {
    document.cookie = `PHPSESSID=${data.sessionId}; path=/; expires=${new Date(Date.now() + 86400).toUTCString()}`;
  } else {
    document.cookie = `PHPSESSID=${data.sessionId}; path=/;`;
  }
  return data;
};

/**
 * Get users with pagination
 * @param {number} page
 * @returns {JSON}
 * */
export const getUsersData = async (page) => {
  const response = await fetch(`${BACKEND_URI}/users?page=${page}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Session-Id': getCookieValue('PHPSESSID'),
    },
    credentials: 'include',
  });
  const data = await response.json();
  if (response.status === 401) {
    throw new Error('Unauthorized');
  }
  if (response.status !== 200) {
    throw new Error(data.message || 'API Error');
  }
  return data;
};

/**
 * logout user
 * */
export const logout = async () => {
  document.cookie = `PHPSESSID=; path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
  // noinspection JSIgnoredPromiseFromCall
  await fetch(`${BACKEND_URI}/auth`, {
    method: 'DELETE',
  });
};
