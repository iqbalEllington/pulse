
function Error({ statusCode }) {
  return (
    <p>
      {statusCode
        ? `An error ${statusCode} occurred on server`
        : 'An error occurred on client'}
    </p>
  )
}

Error.getInitialProps = async ({ res, err, asPath }) => {
  let path = asPath.substring(1)
  try {
    const resp = await fetch(process.env.SEARCH_API + "dubai/property/" + path);
    if (resp.ok) {
      const data = await resp.json();
      const statusCode = res ? res.statusCode : err ? err.statusCode : 404
        return { statusCode }
    } else {
      const statusCode = res ? res.statusCode : err ? err.statusCode : 404
      return { statusCode }
    }
  } catch (err) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404
    return { statusCode }
  }
}

export default Error