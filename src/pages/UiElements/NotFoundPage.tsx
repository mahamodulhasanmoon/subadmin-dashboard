import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-lg text-gray-600 mb-6">Oops! The page you are looking for does not exist.</p>
        <Link to="/" className="text-blue-500 hover:text-blue-700 font-semibold">
          Go back to Home
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
