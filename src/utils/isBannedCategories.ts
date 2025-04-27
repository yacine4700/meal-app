// utils/isBannedCategory.ts
const bannedCategories = ['Pork'];

export const isBannedCategory = (category: string): boolean => {
  return bannedCategories.some(
    banned => banned.toLowerCase() === category.toLowerCase()
  );
};
