import { Link } from "react-router-dom";
// import '../src/App.css';

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 to-purple-200 flex items-center justify-center p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-lg w-full text-center">
        <h1 className="text-3xl font-bold text-indigo-700 mb-6">
          🧑‍⚕️ Disease Prediction
        </h1>
        <p className="text-gray-600 mb-6">Choose your prediction method:</p>

        <div className="space-y-4">
          <Link
            to="/select"
            className="block w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition duration-300"
          >
            Select Symptoms (Checkboxes)
          </Link>
          <Link
            to="/input"
            className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300"
          >
            Enter Symptoms (Text Input)
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
