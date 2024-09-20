import PropTypes from 'prop-types';
import useTailWindConfig from '../hooks/useTailWindConfig';

const MenuButton = ({ className = '', strokeOnly = false, onClick, ...props }) => {
    const theme = useTailWindConfig();
    const primaryColor = theme.colors.primary;
    const strokeColor = strokeOnly ? primaryColor : 'currentColor';
    const fillColor = strokeOnly ? 'transparent' : 'none';
    const dropShadow = strokeOnly ? `drop-shadow(0 0 2px ${primaryColor})` : 'none';

    return (
        <button
            onClick={onClick}
            className={`focus:outline-none ${className}`}
            {...props}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10"
                fill={fillColor}
                viewBox="0 0 24 24"
                stroke={strokeColor}
                style={{
                    transition: 'transform 0.3s ease, fill 0.3s ease, stroke 0.3s ease, filter 0.3s ease',
                    transform: 'scale(1)',
                    filter: dropShadow,
                }}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                />
            </svg>
        </button>
    );
};

MenuButton.propTypes = {
    className: PropTypes.string,
    strokeOnly: PropTypes.bool,  // Toggle between stroke with shadow and filled button
    onClick: PropTypes.func.isRequired,
};

export default MenuButton;
