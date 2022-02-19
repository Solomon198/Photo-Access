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
  transparent,
}) => (
  <Button
    onClick={onClick || null}
    disabled={disabled}
    fullWidth={fullWidth}
    variant={variant}
    color={color}
    className={className}
    style={{
      backgroundImage: transparent
        ? "#fff"
        : "linear-gradient(90deg, #adcde0, #039dfc)",
    }}
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
  transparent: PropTypes.bool,
};

export default BtnCustom;
