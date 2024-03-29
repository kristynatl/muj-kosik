import { Outlet } from 'react-router-dom';

export const App = (): JSX.Element => {
  return (
    <>
      <div className="banner"></div>
      <div className="container">
        <h1>Můj košík</h1>
        <Outlet />
      </div>
    </>
  );
};
