import { Fragment } from 'react';
import { IProduct } from './Product';

interface IProps {
	products: IProduct[];
	onShowCart: React.MouseEventHandler<HTMLButtonElement>;
}

function Nav(props: IProps) {
	return (
		<Fragment>
			<header>
				<div className="logo">HOME</div>
				<button className="cart" onClick={props.onShowCart}>
					<i className="fa-solid fa-shopping-cart"></i>
				</button>
			</header>
		</Fragment>
	);
}

export default Nav;
