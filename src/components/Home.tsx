import React, { useState } from 'react';
import Product, { IProduct } from './Product';
import Cart from './Cart';
import { products as mockProduct } from '../assets/dummy';
import { ACTIONS } from './Cart';
import Nav from './Nav';
import { ProductContext } from '../contexts/product.context';

function Home() {
	const [isShowCart, setShowCart] = useState<boolean>(false);
	const [products, setProducts] = useState<IProduct[]>(mockProduct);
	const [subTotal, setSubTotal] = useState<number>(0);

	const handleShowCart = (): React.SetStateAction<void> => setShowCart(!isShowCart);

	const handleAddToCart = (prodId: string, action: ACTIONS): React.SetStateAction<void> => {
		products.forEach((product: IProduct) => {
			if (product.id === prodId) {
				switch (action) {
					case ACTIONS.UP:
						product.buyQuantity += 1;
						break;
					case ACTIONS.DOWN:
						product.buyQuantity -= 1;
						break;
					case ACTIONS.REMOVE:
						product.buyQuantity = 0;
						break;
					default:
						throw Error('Invalid action...');
				}
			}
		});
		// new array to re-render
		setProducts([...products]);

		const calculator: number = products.reduce((accumulator: number, product: IProduct) => {
			return accumulator + product.buyQuantity * product.price;
		}, 0);
		// set purchase
		setSubTotal(calculator);
	};

	return (
		<ProductContext.Provider value={products}>
			<nav>{!isShowCart && <Nav onShowCart={handleShowCart} />}</nav>

			<aside id="cart">{isShowCart && <Cart onShowCart={handleShowCart} onAddToCart={handleAddToCart} subTotal={subTotal} />}</aside>

			<main id="main">{!isShowCart && <Product listProducts={products} onAddToCart={handleAddToCart}></Product>}</main>

			<footer></footer>
		</ProductContext.Provider>
	);
}

export default Home;
