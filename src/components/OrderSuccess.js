export default function OrderSuccess({ orderDetails, onClose }) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white text-black rounded-lg p-4 max-w-md w-full">
          <div className="text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <svg className="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-4">Order Confirmed!</h2>
            <p className="text-gray-600 mb-4">
              Thank you for your order, {orderDetails.name}! Your food will be delivered to:
            </p>
            <div className="text-left bg-gray-50 p-3 rounded-lg mb-6">
              <p className="mb-2">{orderDetails.address}</p>
              <p className="text-gray-600">Phone: {orderDetails.phone}</p>
              {orderDetails.instructions && (
                <p className="text-gray-600 mt-2">
                  Instructions: {orderDetails.instructions}
                </p>
              )}
            </div>
            <div className="text-left mb-4">
              <h3 className="font-bold mb-2">Order Summary:</h3>
              <div className="space-y-2">
                {orderDetails.items.map(item => (
                  <div key={item.id} className="flex justify-between">
                    <span>{item.quantity}x {item.name}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="border-t pt-2 mt-2 font-bold">
                  <div className="flex justify-between">
                    <span>Total:</span>
                    <span className="text-yellow-500">${orderDetails.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-full bg-yellow-500 text-black py-2 px-4 rounded hover:bg-yellow-600 transition-colors"
            >
              Rate Your Experience
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  