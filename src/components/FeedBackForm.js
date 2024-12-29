import { useState } from 'react';
import { Star } from 'lucide-react';

export default function FeedbackForm({ onSubmit, onClose }) {
  const [feedback, setFeedback] = useState({
    rating: 5,
    comments: '',
    subscribe: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(feedback);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFeedback(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleRatingChange = (rating) => {
    setFeedback(prev => ({ ...prev, rating }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white text-black rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Rate Your Experience</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Rating</label>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleRatingChange(star)}
                  className="focus:outline-none"
                >
                  <Star
                    className={`w-8 h-8 ${
                      star <= feedback.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Comments</label>
            <textarea
              name="comments"
              value={feedback.comments}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2"
              rows="3"
            />
          </div>
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="subscribe"
                checked={feedback.subscribe}
                onChange={handleChange}
                className="mr-2"
              />
              Subscribe to newsletter
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-500 text-black py-2 px-4 rounded hover:bg-yellow-600 transition-colors"
          >
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
}

