import React from "react";
import './Header.css'

const Header = () => {
	return (
		<div className="header-container">
			<nav>
				<ul className="header-ul">
					<li className="header-lilogo"> Expense-Track</li>
          {/* <li  className="header-li">Logout</li> */}
				</ul>
			</nav>
		</div>
	);
};

export default Header;
