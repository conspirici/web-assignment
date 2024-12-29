import MenuItem from './MenuItem';

export default function MenuList({ items, onAddToCart }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {items.map(item => (
        <MenuItem key={item.id} item={item} onAddToCart={onAddToCart} />
      ))}
    </div>
  );
}

