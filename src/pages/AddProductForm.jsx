import { useState } from 'react';

function AddProductForm() {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      const response = await fetch('http://localhost:3000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: title,
          price: parseFloat(price)
        })
      });

      const result = await response.json();

      if (response.ok) {
        setMessage(`✅ সফল! নতুন প্রোডাক্ট: ${result.product.title}`);
        setTitle('');
        setPrice('');
      } else {
        setError(`❌ ত্রুটি: ${result.error}`);
      }
    } catch (err) {
      setError(`❌ সংযোগ ত্রুটি: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 border border-gray-300 rounded-lg shadow-md">
        
        <h2 className="text-2xl font-bold mb-6 text-gray-800">নতুন প্রোডাক্ট যোগ করো</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* প্রোডাক্ট নাম */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">প্রোডাক্ট নাম:</label>
            <input
              type="text"
              placeholder="যেমন: iPhone 16"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* দাম */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">দাম:</label>
            <input
              type="number"
              placeholder="যেমন: 1299"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* সাবমিট বাটন */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 font-semibold text-white rounded-lg transition ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600 cursor-pointer'
            }`}
          >
            {loading ? 'যোগ করছি...' : 'প্রোডাক্ট যোগ করো'}
          </button>
        </form>

        {/* সাফল্য মেসেজ */}
        {message && (
          <p className="mt-4 p-3 bg-green-100 text-green-700 font-bold rounded-lg">
            {message}
          </p>
        )}

        {/* এরর মেসেজ */}
        {error && (
          <p className="mt-4 p-3 bg-red-100 text-red-700 font-bold rounded-lg">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}

export default AddProductForm;