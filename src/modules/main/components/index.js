import { renderRoutes } from 'react-router-config';
import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import useViewport from 'common/hooks/useViewport ';
import NavbarComponent from './navbar';
import SidebarComponent from './sidebar';
import FooterComponent from './footer';
import MainRouter from './router';

const MainComponent = () => {
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
			<NavbarComponent handleShowClose={handleShowClose} />
			<SidebarComponent wrapperRef={wrapperRef} />
			<div className="content-wrapper">
				<div className="container-fluid">{renderRoutes(MainRouter)}</div>
			</div>
			<FooterComponent />
			<div className="sidebar-overlay"></div>
		</div>
	);
};

export default MainComponent;
