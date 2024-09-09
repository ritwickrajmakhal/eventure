export const parseJSONFile = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        // Parse the file content as JSON
        const json = JSON.parse(event.target.result);
        resolve(json);
      } catch (error) {
        reject(new Error("Invalid JSON file"));
      }
    };

    reader.onerror = () => reject(new Error("Error reading the file"));

    // Read the file as text
    reader.readAsText(file);
  });
};
