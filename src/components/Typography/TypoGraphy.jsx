import { Typography, styled } from "@mui/material";

const TypoGraphy = () => {
  const TypoGraphy = styled(Typography)({
    color: "Grey",
    fontSize: "20px",
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase",
    textDecoration: "underline",
    marginBottom: "20px",
    "&:hover": {
      color: "blue",
    },
  });

  return (
    <>
      <TypoGraphy>QUILL EDITOR</TypoGraphy>
    </>
  );
};

export default TypoGraphy;
// let firstArr = [
//   { id: 2, name: "Ali", age: 25 },
//   { id: 3, name: "Khan", age: 30 },
// ];
// let secondArr = [
//   { id: 1, name: "King" },
//   { id: 2, name: "Ali" },
//   { id: 3, name: "Khan" },
//   { id: 4, name: "Saleman" },
// ];
// let finalArr = firstArr.concat(secondArr);
// let unique = finalArr.filter(
//   (item, index) => finalArr.findIndex((x) => x.id === item.id) === index
// );
// unique.sort((a, b) => a.id - b.id);

// console.log(unique);
