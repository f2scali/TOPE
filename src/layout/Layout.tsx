import { Link } from 'react-router-dom';

export const Layout = ({ children }: any) => {
  return (
    <div>
      <h1>Layout</h1>
      <button>
        <Link to="productos">Productos</Link>
      </button>
      {children}
    </div>
  );
};
