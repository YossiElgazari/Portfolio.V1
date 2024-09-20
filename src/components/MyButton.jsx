import PropTypes from 'prop-types';

const MyButton = ({ children, onClick, className = '', ...props }) => {
  return (
    <button
      onClick={onClick}
      className={`
      text-white font-chakraPetch 
        font-bold py-2 px-6 border-2 border-darkgrey 
        rounded-lg transition-all duration-300
        hover:text-primary hover:border-primary2
        active:bg-secondary active:border-shade4
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

MyButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default MyButton;
