import { Button as Btn, Stack, styled } from "@mui/material";

const Button = () => {
  const Stk = styled(Stack)({
    marginTop: "20px",
    direction: "column",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  });
  return (
    <Stk>
      <Btn variant="contained">Submit</Btn>
    </Stk>
  );
};

export default Button;
