import Head from 'next/head';
import { useEffect, useState } from 'react';
import { getUsersData, logout } from '../helpers/Api';
import { useRouter } from 'next/router';
import UsersBlock from '../components/UsersBlock';

function ListPage() {
  const [usersData, setUsersData] = useState(null);
  const [page, setPage] = useState(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getUsersData(page);
        setUsersData(data);
        if (data.page !== Number(router.query.page)) {
          await router.push(`?page=${data.page}`, undefined, { shallow: true });
        }
      } catch (e) {
        if (e.message === 'Unauthorized') {
          await router.push('/');
        }
      }
    }
    if (page) {
      // noinspection JSIgnoredPromiseFromCall
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    if (router.isReady) {
      setPage(Number(router.query.page) || 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  const onLogoutClick = async () => {
    try {
      await logout();
    } catch {
      // nothing
    } finally {
      await router.push('/');
    }
  };

  return (
    <>
      <Head>
        <title>LMS</title>
      </Head>
      <div className="d-flex flex-column h-100 p-0">
        <main className="flex-shrink-0 col-12">
          <div className="container">
            <h1 className="mt-2 text-center">User List</h1>
            {usersData && (
              <UsersBlock users={usersData.users} page={usersData.page} maxPage={usersData.maxPage} setPage={setPage} />
            )}
          </div>
        </main>
        <footer className="footer mt-auto py-2">
          <div className="container text-center">
            <button id="logout" className="logout border-0 fw-bold" type="button" onClick={onLogoutClick}>
              <span>
                <img src="images/box-arrow-right.svg" alt="" /> Log Out
              </span>
            </button>
          </div>
        </footer>
      </div>
    </>
  );
}

export default ListPage;
