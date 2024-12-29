export default function MenuItem({ item, onAddToCart }) {
    return (
      <div className="bg-white text-black rounded-lg shadow-sm overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-48 object-cover"/>
        <div className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </div>
            <span className="text-lg font-bold text-yellow-500">${item.price.toFixed(2)}</span>
          </div>
          <button
            onClick={() => onAddToCart(item)}
            className="mt-4 w-full bg-yellow-500 text-black py-2 px-4 rounded hover:bg-yellow-600 transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    );
  }
  
  