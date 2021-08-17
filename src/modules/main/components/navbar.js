import React, { useCallback } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import NavItem from 'react-bootstrap/NavItem';
import NavLink from 'react-bootstrap/NavLink';
import { BsList, BsSearch } from 'react-icons/bs';

import CustomImageComponent from 'common/components/CustomImage/components';
import CustomLinkComponent from 'common/components/CustomLink/components';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from 'common/utils/auth';
import history from 'common/utils/history';
import { changeAuth } from 'store/auth/actions';

const NavbarComponent = ({ handleShowClose }) => {
	const auth = useSelector((state) => state.appAuth.current);
	const dispatch = useDispatch();
	const changeAuthData = useCallback((newAuth) => dispatch(changeAuth(newAuth)), [dispatch]);

	return (
		<>
			<nav className="main-navbar py-1 bg-white border-bottom d-flex align-items-center shadow-sm">
				<div className="container-fluid d-flex align-items-center">
					<button type="button" className="d-flex align-items-center border-0 bg-transparent fs-3 p-0" onClick={handleShowClose}>
						<BsList />
					</button>
					<ul className="nav d-flex mx-3">
						<li className="nav-item">
							<CustomLinkComponent href="/" className="nav-link link-secondary px-2">
								Home
							</CustomLinkComponent>
						</li>
					</ul>
					<form className="d-flex align-items-center border rounded-pill px-3 bg-light">
						<input
							type="search"
							className="form-control border-0 bg-light py-1 px-0"
							placeholder="Search..."
							aria-label="Search"
						/>
						<button type="button" className="border-0 bg-transparent p-0 d-flex">
							<BsSearch />
						</button>
					</form>
					<Dropdown as={NavItem} className="ms-auto">
						<Dropdown.Toggle as={NavLink} id="dropdown-user" className={`d-flex align-items-center p-2 dropdown-toggle-none`}>
							<CustomImageComponent className="rounded-circle" src={auth.avatar} width={34} height={34} alt={auth.user_name} />
						</Dropdown.Toggle>
						<Dropdown.Menu align={'end'} className="p-0 dropdown-menu-end shadow-sm">
							<Dropdown.Item href="/">
								<span className="d-block h6 mb-0">
									{auth.first_name} {auth.last_name}
								</span>
								<small className="text-secondary">@{auth.user_name}</small>
							</Dropdown.Item>
							<Dropdown.Divider className="m-0" />
							<Dropdown.Item onClick={() => logout(history, auth, changeAuthData)}>Logout</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
				</div>
			</nav>
		</>
	);
};

export default NavbarComponent;
