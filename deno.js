const data = await Deno.readTextFile("Agencies.json");
let parsedData = JSON.parse(data);
let finalData = [];
for (let state in parsedData) {
  parsedData[state].map((v) => {
    finalData.push({
      agency: `${v}`,
      phone: "",
      street: "",
      city: "",
      state: `${state}`,
      zip: 12345,
    });
  });
}
let finalDataString = JSON.stringify(finalData);
const write = Deno.writeTextFile("./departments.json", finalDataString);

write.then(() => console.log("File written to ./departments.json"));
