import Link from 'next/link';
import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import NavItem from 'react-bootstrap/NavItem';
import NavLink from 'react-bootstrap/NavLink';
import { BsList, BsSearch } from 'react-icons/bs';

import CustomImage from '@/common/components/CustomImage';
import CustomLink from '@/common/components/CustomLink';

const Navbar = ({ handleShowClose }) => {
	return (
		<>
			<nav className="main-navbar py-1 bg-white border-bottom d-flex align-items-center shadow-sm">
				<div className="container-fluid d-flex align-items-center">
					<button type="button" className="d-flex align-items-center border-0 bg-transparent fs-3 p-0" onClick={handleShowClose}>
						<BsList />
					</button>
					<ul className="nav d-flex mx-3">
						<li className="nav-item">
							<CustomLink href="/" className="nav-link link-secondary px-2">
								Home
							</CustomLink>
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
							<CustomImage className="rounded-circle" src={process.env.LOGO_URL} width={34} height={34} alt="" layout="fixed" />
						</Dropdown.Toggle>
						<Dropdown.Menu align={'end'} className="p-0 dropdown-menu-end shadow-sm">
							<Link href={`/`} passHref>
								<Dropdown.Item>
									<span className="d-block h6 mb-0">Nguyen Thuc</span>
									<small className="text-secondary">@thucdaik</small>
								</Dropdown.Item>
							</Link>
							<Dropdown.Divider className="m-0" />
							<Dropdown.Item>Logout</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
				</div>
			</nav>
		</>
	);
};

export default Navbar;
