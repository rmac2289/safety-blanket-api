// const data = await Deno.readTextFile("Agencies.json");
// let parsedData = JSON.parse(data);
// let finalData = [];
// for (let state in parsedData) {
//   parsedData[state].map((v) => {
//     finalData.push({
//       agency: `${v}`,
//       phone: "",
//       street: "",
//       city: "",
//       state: `${state}`,
//       zip: 12345,
//     });
//   });
// }
// let finalDataString = JSON.stringify(finalData);
// const write = Deno.writeTextFile("./departments.json", finalDataString);

// write.then(() => console.log("File written to ./departments.json"));

const data = await Deno.readTextFile("departments.json");
let parsedData = JSON.parse(data);
let emptyData = [];
let filledData = [];
for (let department in parsedData) {
  emptyData = parsedData[department].filter((v) => v.phone === "");
  filledData = parsedData[department].filter((v) => v.phone !== "");
}
let finalFilled = JSON.stringify(filledData);
let finalEmpty = JSON.stringify(emptyData);

const writeEmpty = Deno.writeTextFile("./empty.json", finalEmpty);
const writeFilled = Deno.writeTextFile("./filled.json", finalFilled);

writeEmpty.then(() => console.log("files written"));
