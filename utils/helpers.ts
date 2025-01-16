// regex helper to prevent weird tags on prompts
export const sanitizeTag = (tag: string): string => {
    return tag
      .toLowerCase()                // Convert to lowercase
      .replace(/\s+/g, '')          // Remove all whitespace characters
      .replace(/[^a-z0-9]/g, '');   // Remove all non-alphanumeric characters
};