import PropTypes from "prop-types";
import { Button } from "./button.styles";

const BtnCustom = ({
  onClick,
  disabled,
  fullWidth,
  variant,
  color,
  className,
  children,
}) => (
  <Button
    onClick={onClick || null}
    disabled={disabled}
    fullWidth={fullWidth}
    variant={variant}
    color={color}
    className={className}
  >
    {children}
  </Button>
);

BtnCustom.propTypes = {
  variant: PropTypes.string,
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  color: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.any,
};

export default BtnCustom;
