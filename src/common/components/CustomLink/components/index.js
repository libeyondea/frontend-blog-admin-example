import { Link } from 'react-router-dom';

const CustomLinkComponent = ({ className, href, children, ...props }) => (
	<Link to={href} className={className} {...props}>
		{children}
	</Link>
);

export default CustomLinkComponent;
