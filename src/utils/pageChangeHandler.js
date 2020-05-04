import ReactGA from 'react-ga';

function handlePageChange() {
  const { location: { pathname }, title } = document;
  ReactGA.set({ page: pathname }); // Update the user's current page
  ReactGA.pageview(pathname, [], title); // Record a pageview for the given page
}

export default handlePageChange;
