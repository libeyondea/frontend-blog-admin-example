import classNames from 'classnames';
import { useRouter } from 'next/router';
import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { FaBook, FaListAlt, FaPlus, FaRegCircle, FaTachometerAlt, FaTags, FaThLarge } from 'react-icons/fa';

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
				<ul className="list-group">
					<Accordion
						as="li"
						className="list-group-item border-0 p-0"
						defaultActiveKey={router.pathname === '/' ? 'dashboard' : ''}
					>
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
					</Accordion>
					<Accordion
						as="li"
						className="list-group-item border-0 p-0"
						defaultActiveKey={router.pathname === '/articles/lists' || router.pathname === '/articles/create' ? 'articles' : ''}
					>
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
									<FaListAlt className="me-2 fs-5" /> Lists
								</CustomLink>
								<CustomLink
									href={`/articles/create`}
									className={classNames('d-flex align-items-center dropdown-item p-2 ps-4 mb-1', {
										'active-page': router.pathname === '/articles/create'
									})}
								>
									<FaPlus className="me-2 fs-5" /> Create
								</CustomLink>
							</>
						</Accordion.Collapse>
					</Accordion>
					<Accordion
						as="li"
						className="list-group-item border-0 p-0"
						defaultActiveKey={
							router.pathname === '/categories/lists' || router.pathname === '/categories/create' ? 'categories' : ''
						}
					>
						<CustomToggle
							eventKey="categories"
							className={classNames({
								'active-page': router.pathname === '/categories/lists' || router.pathname === '/categories/create'
							})}
						>
							<>
								<FaThLarge className="me-2 fs-5" /> Categories
							</>
						</CustomToggle>
						<Accordion.Collapse eventKey="categories">
							<>
								<CustomLink
									href={`/categories/lists`}
									className={classNames('d-flex align-items-center dropdown-item p-2 ps-4 mb-1', {
										'active-page': router.pathname === '/categories/lists'
									})}
								>
									<FaListAlt className="me-2 fs-5" /> Lists
								</CustomLink>
								<CustomLink
									href={`/categories/create`}
									className={classNames('d-flex align-items-center dropdown-item p-2 ps-4 mb-1', {
										'active-page': router.pathname === '/categories/create'
									})}
								>
									<FaPlus className="me-2 fs-5" /> Create
								</CustomLink>
							</>
						</Accordion.Collapse>
					</Accordion>
					<Accordion
						as="li"
						className="list-group-item border-0 p-0"
						defaultActiveKey={router.pathname === '/tags/lists' || router.pathname === '/tags/create' ? 'tags' : ''}
					>
						<CustomToggle
							eventKey="tags"
							className={classNames({
								'active-page': router.pathname === '/tags/lists' || router.pathname === '/tags/create'
							})}
						>
							<>
								<FaTags className="me-2 fs-5" /> Tags
							</>
						</CustomToggle>
						<Accordion.Collapse eventKey="tags">
							<>
								<CustomLink
									href={`/tags/lists`}
									className={classNames('d-flex align-items-center dropdown-item p-2 ps-4 mb-1', {
										'active-page': router.pathname === '/tags/lists'
									})}
								>
									<FaListAlt className="me-2 fs-5" /> Lists
								</CustomLink>
								<CustomLink
									href={`/tags/create`}
									className={classNames('d-flex align-items-center dropdown-item p-2 ps-4 mb-1', {
										'active-page': router.pathname === '/tags/create'
									})}
								>
									<FaPlus className="me-2 fs-5" /> Create
								</CustomLink>
							</>
						</Accordion.Collapse>
					</Accordion>
				</ul>
			</div>
		</div>
	);
};

export default Sidebar;
