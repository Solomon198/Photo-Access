import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";

const TextInput = ({
  name,
  type,
  disabled,
  value,
  id,
  label,
  fullWidth,
  required,
  onChange,
  autoFocus,
  variant,
  margin,
  className,
}) => (
  <TextField
    variant={variant || "outlined"}
    margin={margin || "normal"}
    required={required}
    fullWidth={fullWidth}
    disabled={disabled}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    type={type}
    id={id}
    label={label}
    name={name}
    autoFocus={autoFocus || false}
    className={className}
  />
);

TextInput.propTypes = {
  variant: PropTypes.string,
  margin: PropTypes.string,
  required: PropTypes.bool.isRequired,
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  autoFocus: PropTypes.bool,
  className: PropTypes.string,
};

export default TextInput;
