import Papa from "papaparse";
import * as XLSX from "xlsx";
import yaml from "js-yaml";
/**
 * Determines the file type and parses accordingly.
 * @param {File} file - The file to be parsed.
 * @return {Promise<Object>} - Parsed JSON data.
 */
export const convertToJSON = (file) => {
  return new Promise((resolve, reject) => {
    const fileType = file.name.split(".").pop().toLowerCase();
    const reader = new FileReader();

    reader.onload = async (event) => {
      const fileContent = event.target.result;

      try {
        switch (fileType) {
          case "csv":
            Papa.parse(fileContent, {
              header: true,
              complete: (results) => resolve(results.data),
              error: (error) => reject(error),
            });
            break;
          case "xlsx":
          case "xls":
            const data = new Uint8Array(event.target.result);
            const workbook = XLSX.read(data, { type: "array" });
            const json = XLSX.utils.sheet_to_json(
              workbook.Sheets[workbook.SheetNames[0]]
            );
            resolve(json);
            break;
          case "yaml":
          case "yml":
            resolve(yaml.load(fileContent));
            break;
          case "json":
            resolve(JSON.parse(fileContent));
            break;
          default:
            reject(new Error("Unsupported file type"));
        }
      } catch (err) {
        reject(err);
      }
    };

    if (fileType === "xlsx" || fileType === "xls") {
      reader.readAsArrayBuffer(file);
    } else {
      reader.readAsText(file);
    }
  });
};
