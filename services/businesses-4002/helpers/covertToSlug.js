function convertToSlug(name) {
    const slug = name
      .toLowerCase() // Convert to lowercase
      .replace(/\s+/g, "-") // Replace spaces with dashes
      .replace(/[^\w\-]+/g, "") // Remove special characters and non-alphanumeric characters
      .replace(/\-\-+/g, "-") // Replace multiple dashes with a single dash
      .replace(/^-+/, "") // Remove leading dashes
      .replace(/-+$/, ""); // Remove trailing dashes
  
    return slug;
  }

  module.exports = {convertToSlug}