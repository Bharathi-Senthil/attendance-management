export function jsonToCSV(data: any, year: any, sec: any, date?: any) {
  const yearName = ["I", "II", "III", "IV"];
  const secName = ["A", "B", "C", "D", "E", "F"];
  const replacer = (key: any, value: any) => (value === null ? "" : value);
  const header = Object.keys(data[0]);
  const csv = data.map((row: any) =>
    header
      .map((fieldName) => JSON.stringify(row[fieldName], replacer))
      .join(",")
  );
  csv.unshift(header.join(","));
  const csvArray = csv.join("\r\n");

  let fileName = date
    ? `${date}-${yearName[year - 1]}-${
        sec !== "null" ? secName[sec - 1] : ""
      }.csv`
    : `${yearName[year - 1]}-${sec !== "null" ? secName[sec - 1] : ""}Full.csv`;

  return { csv: csvArray, fileName };
}
