type DataProps<T> = {
  items: T[]
}

type Items = {
  state: string,
  listing_id: number,
  url?: string,
  MainImage?: { url_570xN: string },
  title?: string,
  currency_code?: string,
  price?: string,
  quantity?: number
}

const Listing = ({ items = [] }: DataProps<Items>) => {
  return (
    <div className="item-list">
      {items.map((item: Items) => {
        return (
          item.state === 'removed' ? null :
            <div key={item.listing_id} className="item">
              <div className="item-image">
                <a href={item.url}>
                  <img src={item.MainImage?.url_570xN} alt={item.title} />
                </a>
              </div>
              <div className="item-details">
                <p className="item-title">{item.title && trimString(item.title)}</p>
                <p className="item-price">
                  {replaceCurrencyCode(item.currency_code, item.price)}
                </p>
                <p className={highlightQuantityProducts(item.quantity)}>{item.quantity}</p>
              </div>
            </div>
        )
      })}
    </div>
  );
}

const trimString = (value: string): string => {
  if (value.length > 50) {
    return value.slice(0, 50) + "...";
  } else {
    return value;
  }
}

const replaceCurrencyCode = (code: string | undefined, price: string | undefined): string | null => {
  if (code === 'USD') return code.replace(code, '$') + price;
  if (code === 'EUR') return code.replace(code, '€') + price;
  if (code === 'GBP') return price + ' ' + code;
  return null;
}

const highlightQuantityProducts = (quantity: number | undefined): string | undefined => {
  if (!quantity) return undefined;
  if (quantity <= 10) return 'item-quantity level-low';
  if (quantity <= 20) return 'item-quantity level-medium';
  if (quantity > 20) return 'item-quantity level-high';
}

export default Listing;