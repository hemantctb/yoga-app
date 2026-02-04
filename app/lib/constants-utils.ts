import constants from './constants.json';

// Create lookup maps for efficient ID to name conversion
const anatomyMap = new Map(constants.anatomy.map((item) => [item.id, item.name]));
const chakraMap = new Map(constants.chakras.map((item) => [item.id, item.name]));
const drishtiMap = new Map(constants.drishtis.map((item) => [item.id, item.name]));
const categoryMap = new Map(constants.categories.map((item) => [item.id, item.name]));
const difficultyMap = new Map(constants.difficulty_levels.map((item) => [item.id, item.name]));
const propMap = new Map(constants.props.map((item) => [item.id, item.name]));
const assistTypeMap = new Map(constants.assist_types.map((item) => [item.id, item.name]));

/**
 * Get the display name for an anatomy/muscle ID
 * @param id - The muscle ID (e.g., "quadriceps")
 * @returns The display name (e.g., "Quads (Front Thigh)") or the original ID if not found
 */
export function getMuscleName(id: string): string {
  return anatomyMap.get(id) || id;
}

/**
 * Get the display name for a chakra ID
 * @param id - The chakra ID (e.g., "muladhara")
 * @returns The display name (e.g., "Muladhara (Root)") or the original ID if not found
 */
export function getChakraName(id: string): string {
  return chakraMap.get(id) || id;
}

/**
 * Get the display name for a drishti ID
 * @param id - The drishti ID (e.g., "nose-tip")
 * @returns The display name (e.g., "Nose Tip") or the original ID if not found
 */
export function getDrishtiName(id: string): string {
  return drishtiMap.get(id) || id;
}

/**
 * Get the display name for a category ID
 * @param id - The category ID (e.g., "standing")
 * @returns The display name (e.g., "Standing") or the original ID if not found
 */
export function getCategoryName(id: string): string {
  return categoryMap.get(id) || id;
}

/**
 * Get the display name for a difficulty level ID
 * @param id - The difficulty ID (e.g., "beginner")
 * @returns The display name (e.g., "Beginner") or the original ID if not found
 */
export function getDifficultyName(id: string): string {
  return difficultyMap.get(id) || id;
}

/**
 * Get the display name for a prop ID
 * @param id - The prop ID (e.g., "block")
 * @returns The display name (e.g., "Block") or the original ID if not found
 */
export function getPropName(id: string): string {
  return propMap.get(id) || id;
}

/**
 * Get the display name for an assist type ID
 * @param id - The assist type ID (e.g., "grounding")
 * @returns The display name (e.g., "Grounding") or the original ID if not found
 */
export function getAssistTypeName(id: string): string {
  return assistTypeMap.get(id) || id;
}

// Export the raw constants for direct access if needed
export { constants };
