interface PropsTypes {
  disabled?: boolean,
  onClick?: () => void,
  color: string,
  children: React.ReactNode,
  classes?: string,
}

const Button: React.FC<PropsTypes> = ({disabled, onClick, color, children, classes}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`disabled:opacity-50 border-2 rounded-md uppercase ${classes}`}
      style={{ boxShadow: `0 0 5px 1px ${color}`, borderColor: color, color}}
    >
      {children}
    </button>
  );
};

export default Button;
