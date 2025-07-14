// Helper function to serialize Mongoose documents/sub-documents
export async function serializeMongooseDocument<T>(doc: T): any {
  if (!doc) return doc;

  // If it's a Mongoose document instance, use .toObject() first
  if (typeof doc.toObject === "function") {
    doc = doc.toObject({ virtuals: true }); // Include virtuals if you need them
  }

  // Then, recursively process to stringify ObjectIds and Dates
  const serializedDoc: { [key: string]: any } = {};
  for (const key in doc) {
    if (Object.prototype.hasOwnProperty.call(doc, key)) {
      const value = doc[key];

      // Handle Mongoose ObjectId
      if (value && typeof value === "object" && value.toString && value.constructor.name === "ObjectId") {
        serializedDoc[key] = value.toString();
      }
      // Handle Date objects
      else if (value instanceof Date) {
        serializedDoc[key] = value.toISOString(); // Or .toString() or .getTime()
      }
      // Handle arrays recursively
      else if (Array.isArray(value)) {
        serializedDoc[key] = value.map((item) => {
          // Check if item in array is an object that might need serialization
          if (item && typeof item === "object" && !Array.isArray(item)) {
            return serializeMongooseDocument(item);
          }
          return item; // Primitive or already plain
        });
      }
      // Handle nested plain objects recursively
      else if (value && typeof value === "object" && !Array.isArray(value)) {
        serializedDoc[key] = serializeMongooseDocument(value);
      }
      // Default for primitives and already plain objects
      else {
        serializedDoc[key] = value;
      }
    }
  }
  return serializedDoc;
}
