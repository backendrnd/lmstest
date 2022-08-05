import { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import { auth } from '../helpers/Api';
import { useRouter } from 'next/router';

function IndexPage() {
  const [error, setError] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    setError(null);
  }, [username, password]);

  const onLoginClick = async () => {
    const isValid = formRef.current.checkValidity();
    if (!isValid) {
      formRef.current.reportValidity();
      return;
    }
    let data;
    try {
      setError(null);
      setIsLoading(true);
      data = await auth({ username, password, remember });
    } catch (e) {
      setError(e.message || 'An Error Occurred, Please Try Again Later');
    } finally {
      setIsLoading(false);
    }
    if (data) {
      await router.push('/list');
    }
  };

  const onUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const onRememberChange = (event) => {
    setRemember(event.target.checked);
  };

  return (
    <>
      <Head>
        <title>LMS</title>
      </Head>
      <main className="form-signin w-100 m-auto d-flex flex-column h-100 justify-content-center">
        <img className="mb-4" src="images/Logo.svg" alt="" width="100%" />
        <h5 className="mb-0">Welcome to the Learning Management System</h5>
        <h6>Please login to continue</h6>
        <form className="mt-5" ref={formRef}>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control icon-username rounded-pill"
              placeholder="Username"
              aria-label="Username"
              aria-describedby="username"
              value={username}
              onChange={onUsernameChange}
              required={true}
            />
          </div>
          <div className="input-group mb-3">
            <input
              type="password"
              className="form-control icon-lock rounded-pill"
              placeholder="Password"
              autoComplete="on"
              aria-label="Password"
              aria-describedby="validationServer03Feedback"
              value={password}
              onChange={onPasswordChange}
              required={true}
            />
          </div>
          <div className="checkbox mb-2">
            <label>
              <input type="checkbox" value="remember" checked={remember} onChange={onRememberChange} /> Remember me
            </label>
          </div>
          {error && <div className="error-text">{error}</div>}
          <div className="pt-5">
            <button
              className="w-100 btn btn-primary text-start rounded-pill icon-arrow"
              type="button"
              onClick={onLoginClick}
              disabled={isLoading}
            >
              Log in
            </button>
          </div>
        </form>
      </main>
    </>
  );
}

export default IndexPage;
