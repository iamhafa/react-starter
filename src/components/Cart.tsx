import React, { Fragment, memo, useContext } from 'react';
import { IProduct } from './Product';
import { ProductContext } from '../contexts/product.context';

export enum ACTIONS {
	UP = 'up',
	DOWN = 'down',
	REMOVE = 'remove',
}
interface IProps {
	onShowCart: React.MouseEventHandler<HTMLButtonElement>;
	onAddToCart: (prodId: string, action: ACTIONS) => void;
	subTotal: number;
}

function Cart(props: IProps) {
	const productContext = useContext<IProduct[]>(ProductContext);

	return (
		<Fragment>
			{/* close button */}
			<button className="btn_close-cart" onClick={props.onShowCart}>
				<i className="fa-solid fa-xmark"></i>
			</button>

			<div className="bg-gray-100 h-screen py-8">
				<div className="container mx-auto px-4">
					<h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
					<div className="flex flex-col md:flex-row gap-4">
						<div className="md:w-3/4">
							<div className="bg-white rounded-lg shadow-md p-6 mb-4">
								<table className="w-full">
									<thead>
										<tr>
											<th className="text-left font-semibold">Product</th>
											<th className="text-left font-semibold">Price</th>
											<th className="text-left font-semibold">Quantity</th>
											<th className="text-left font-semibold">Total</th>
										</tr>
									</thead>
									<tbody>
										{/* list product in cart */}
										{productContext.map(
											(prod: IProduct, index: number) =>
												prod.buyQuantity > 0 && (
													<tr key={index}>
														<td className="py-4">
															<div className="flex items-center">
																<img className="h-32 w-32 mr-4" src={prod.imageURL} alt="Product image" />
																<span className="font-semibold">{prod.name}</span>
															</div>
														</td>
														<td className="py-4">${prod.price}</td>
														<td className="py-4">
															<div className="flex items-center">
																<button
																	className="border rounded-md py-2 px-4 mr-2"
																	onClick={() => props.onAddToCart(prod.id, ACTIONS.DOWN)}
																>
																	-
																</button>
																<span className="text-center w-8">{prod.buyQuantity}</span>
																<button
																	className="border rounded-md py-2 px-4 ml-2"
																	onClick={() => props.onAddToCart(prod.id, ACTIONS.UP)}
																>
																	+
																</button>
															</div>
														</td>
														<td className="py-4">${prod.buyQuantity * prod.price}</td>
														<td className="py-4">
															<button onClick={() => props.onAddToCart(prod.id, ACTIONS.REMOVE)}>Remove</button>
														</td>
													</tr>
												),
										)}
									</tbody>
								</table>
							</div>
						</div>
						<div className="md:w-1/4">
							<div className="bg-white rounded-lg shadow-md p-6">
								<h2 className="text-lg font-semibold mb-4">Summary</h2>
								<div className="flex justify-between mb-2">
									<span>Subtotal</span>
									<span>${props.subTotal}</span>
								</div>
								<div className="flex justify-between mb-2">
									<span>Shipping</span>
									<span>-</span>
								</div>
								<hr className="my-2" />
								<div className="flex justify-between mb-2">
									<span className="font-semibold">Total</span>
									<span className="font-semibold">${props.subTotal}</span>
								</div>
								<button
									className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full btn"
									onClick={() => window.confirm('Are you sure to checkout')}
								>
									Checkout
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
}

export default memo(Cart);
