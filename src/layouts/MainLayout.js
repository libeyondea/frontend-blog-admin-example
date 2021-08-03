import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';

import useViewport from '@/common/hooks/useViewport ';

import Content from './Content';
import Footer from './Footer';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const MainLayout = ({ children }) => {
	const [showMenu, setShowMenu] = useState(false);
	const { vw } = useViewport();
	const wrapperRef = useRef(null);

	const handleShowClose = () => setShowMenu(!showMenu);

	useEffect(() => {
		function handleClickOutside(event) {
			if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
				setShowMenu(false);
			}
		}
		if (vw < 992) {
			document.addEventListener('mousedown', handleClickOutside);
			return () => {
				document.removeEventListener('mousedown', handleClickOutside);
			};
		}
	}, [vw, wrapperRef]);

	return (
		<div className={classNames('sidebar-mini', { 'sidebar-collapse': showMenu })}>
			<Navbar handleShowClose={handleShowClose} />
			<Sidebar wrapperRef={wrapperRef} />
			<Content>{children}</Content>
			<Footer />
			<div className="sidebar-overlay"></div>
		</div>
	);
};

export default MainLayout;
