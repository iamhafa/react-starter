import { Fragment } from 'react';
import { ACTIONS } from './Cart';

export interface IProduct {
	id: string;
	name: string;
	category: string;
	description: string;
	price: number;
	imageURL: string;
	buyQuantity: number;
	remainingQuantity: number;
}

interface IProps {
	listProducts: IProduct[];
	onAddToCart: (prodId: string, action: ACTIONS) => void;
}
function Product(props: IProps) {
	return (
		<Fragment>
			{props.listProducts.map((product: IProduct) => (
				<div className="product_card">
					<div className="product_tumb">
						<img src={product.imageURL} />
					</div>
					<div className="product_details">
						<span className="product_category">{product.category}</span>
						<h4>
							<a href="">{product.name}</a>
							{/* <span className="product_remaining">Remaining: {product.remainingQuantity}</span> */}
						</h4>
						<p>{product.description}</p>
						<div className="product_bottom_details">
							<div className="product_price">${product.price}</div>
							<div className="product_cart">
								<button className="product-item" onClick={() => props.onAddToCart(product.id, ACTIONS.UP)}>
									<i id={product.id} className="fa-solid fa-cart-plus" />
								</button>
							</div>
						</div>
					</div>
				</div>
			))}
		</Fragment>
	);
}

export default Product;
