import React, { useState } from 'react';

export default function App() {
  const [file, setFile] = useState(null);
  const [goobUrl, setGoobUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setGoobUrl('');
  };

  const handleSubmit = async () => {
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch(import.meta.env.VITE_API_URL + '/goobify', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      setGoobUrl(data.goob_url);
    } catch (err) {
      console.error('GOOBIFY failed:', err);
      alert('Something went wrong while goobifying!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-br from-fuchsia-600 to-indigo-900 text-white">
      <h1 className="text-4xl font-bold mb-4">GOOBIFY YOURSELF</h1>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="mb-4"
      />
      <button
        onClick={handleSubmit}
        className="bg-yellow-400 text-black px-6 py-2 rounded-xl font-bold hover:bg-yellow-300"
        disabled={loading || !file}
      >
        {loading ? 'GOOBIFYING...' : 'GOOBIFY ME'}
      </button>
      {goobUrl && (
        <div className="mt-6">
          <h2 className="text-2xl mb-2">Here’s Your GOOBER:</h2>
          <img src={goobUrl} alt="GOOBIFIED" className="rounded-xl shadow-xl max-w-md" />
        </div>
      )}
    </div>
  );
}
