DefaultLayout = ({content = () => null }) => (
  <div>
    <header>
      <Navigations />
    </header>

    <div className="container">
      {content}
    </div>

    <footer>
      <small>Fitness app</small>
    </footer>
  </div>
);
