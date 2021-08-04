import classNames from 'classnames';
import { useRouter } from 'next/router';
import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { FaBook, FaRegCircle, FaTachometerAlt } from 'react-icons/fa';

import CustomImage from '@/common/components/CustomImage';
import CustomLink from '@/common/components/CustomLink';
import CustomToggle from '@/common/components/CustomToggle';

const Sidebar = ({ wrapperRef }) => {
	const router = useRouter();

	return (
		<div className="main-sidebar shadow-sm" ref={wrapperRef}>
			<div className="py-2 px-4 border-bottom border-secondary sidebar-header">
				<CustomLink href="/" className="d-flex align-items-center text-white text-decoration-none">
					<CustomImage
						className="rounded-circle"
						src={process.env.LOGO_URL}
						width={42}
						height={42}
						alt={process.env.SITE_NAME}
						layout="fixed"
					/>
					<span className="ms-2 fs-5 fw-bolder">{process.env.SITE_NAME}</span>
				</CustomLink>
			</div>
			<div className="px-2 py-3 sidebar-body">
				<Accordion
					as="ul"
					className="list-group"
					defaultActiveKey={
						router.pathname === '/'
							? 'dashboard'
							: router.pathname === '/articles/lists' || router.pathname === '/articles/create'
							? 'articles'
							: ''
					}
				>
					<li className="list-group-item border-0 p-0">
						<CustomToggle
							eventKey="dashboard"
							className={classNames({
								'active-page': router.pathname === '/'
							})}
						>
							<>
								<FaTachometerAlt className="me-2 fs-5" /> Dashboard
							</>
						</CustomToggle>
						<Accordion.Collapse eventKey="dashboard">
							<>
								<CustomLink
									href="/"
									className={classNames('d-flex align-items-center dropdown-item p-2 ps-4 mb-1', {
										'active-page': router.pathname === '/'
									})}
								>
									<FaRegCircle className="me-2 fs-5" /> Dashboard v1
								</CustomLink>
							</>
						</Accordion.Collapse>
					</li>
					<li className="list-group-item border-0 p-0">
						<CustomToggle
							eventKey="articles"
							className={classNames({
								'active-page': router.pathname === '/articles/lists' || router.pathname === '/articles/create'
							})}
						>
							<>
								<FaBook className="me-2 fs-5" /> Articles
							</>
						</CustomToggle>
						<Accordion.Collapse eventKey="articles">
							<>
								<CustomLink
									href={`/articles/lists`}
									className={classNames('d-flex align-items-center dropdown-item p-2 ps-4 mb-1', {
										'active-page': router.pathname === '/articles/lists'
									})}
								>
									<FaRegCircle className="me-2 fs-5" /> Lists
								</CustomLink>
								<CustomLink
									href={`/articles/create`}
									className={classNames('d-flex align-items-center dropdown-item p-2 ps-4 mb-1', {
										'active-page': router.pathname === '/articles/create'
									})}
								>
									<FaRegCircle className="me-2 fs-5" /> Create
								</CustomLink>
							</>
						</Accordion.Collapse>
					</li>
				</Accordion>
			</div>
		</div>
	);
};

export default Sidebar;
