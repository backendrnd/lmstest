export default function UsersBlock({ users, page, maxPage, setPage }) {
  return (
    <div className="stripe">
      <table className="table table-striped">
        <tbody>{<Users users={users} />}</tbody>
      </table>
      <nav aria-label="Page navigation">
        <ul className="pagination justify-content-center">
          {<Pagination page={page} maxPage={maxPage} setPage={setPage} />}
        </ul>
      </nav>
    </div>
  );
}

function Users({ users }) {
  return users.map((user, index) => (
    <tr key={index}>
      <th scope="row" className="text-end pe-3">
        <img src="images/check-circle-fill.svg" alt="" />
      </th>
      <td className="w-60">
        {user.login}
        <br />
        <span className="text-secondary">{user.name}</span>
      </td>
      <td>
        …
        <br />
        Default group
      </td>
    </tr>
  ));
}

function Pagination({ page, maxPage, setPage }) {
  const onPageClick = (event) => {
    event.preventDefault();
    const page = event.target.dataset['page'];
    if (typeof setPage === 'function') {
      setPage(page);
    }
  };
  return (
    <>
      <li className={`page-item ${page <= 1 ? 'disabled' : ''}`}>
        <a
          className="page-link border-0 bg-transparent"
          href={`?page=${page - 1}`}
          data-page={page - 1}
          onClick={onPageClick}
        >
          « Prev
        </a>
      </li>
      {[...Array(maxPage)].map((user, index) => (
        <li key={index} className={`page-item ${page === index + 1 ? 'active' : ''}`}>
          <a
            className={`page-link border-0 ${page === index + 1 ? 'border-bottom' : ''} bg-transparent`}
            href={`?page=${index + 1}`}
            data-page={index + 1}
            onClick={onPageClick}
          >
            {index + 1}
          </a>
        </li>
      ))}
      <li className={`page-item ${page >= maxPage ? 'disabled' : ''}`}>
        <a
          className="page-link border-0 bg-transparent"
          href={`?page=${page + 1}`}
          data-page={page + 1}
          onClick={onPageClick}
        >
          Next »
        </a>
      </li>
    </>
  );
}
