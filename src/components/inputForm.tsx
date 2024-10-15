import { TextField } from "@mui/material";

const InputForm = (props: any) => {
  const {
    label,
    mask,
    value,
    name,
    type,
    onChange,
    tamanhoMax,
    isInvalid,
    disabled = false,
    msgError,
  } = props;

  return (
    <TextField
      label={label}
      fullWidth
      type={type ?? "text"}
      sx={{
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "black", // Cor da borda preta
          },
          "&:hover fieldset": {
            borderColor: "black", // Cor da borda preta no hover
          },
          "&.Mui-focused fieldset": {
            borderColor: "black", // Cor da borda preta quando focado
          },
          "& input": {
            color: "black", // Cor do texto preta
          },
        },
        "& .MuiInputLabel-root": {
          color: "black", // Cor da label preta
        },
        "& .MuiInputLabel-root.Mui-focused": {
          color: "black", // Cor da label preta quando focada
        },
      }}
      value={value}
      name={name}
      onChange={onChange}
      error={isInvalid}
      helperText={msgError}
      disabled={disabled}
      InputProps={{
        inputProps: { mask: mask, maxLength: tamanhoMax ?? 240 },
      }}
    />
  );
};

export default InputForm;
