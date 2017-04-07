import * as utils from './utils'

export function createFlashcard(flashcard, prevState) {
  const idComparator = (a, b) => (a.id === b.id);
  // Add new tags to the current list of tags removing duplicates.
  const newTags = utils.union(prevState.tags, flashcard.tags, idComparator);
  // Add new flashcard to the current list of flashcards if it contains
  // the current tag.
  const newFlashcards = prevState.flashcards.concat(
    utils.contains(flashcard.tags, {id: prevState.selectedTagId}, idComparator)
      ? flashcard
      : []
  );
  const newIndex = prevState.selectedFlashcardIndex || 0;

  return {
    tags: newTags,
    flashcards: newFlashcards,
    selectedFlashcardIndex: newIndex,
    flashcardInDialog: null
  };
}

export function updateFlashcard(flashcard, prevState) {
  const { tags, selectedTagId, flashcards, selectedFlashcardIndex } = prevState;

  const idComparator = (a, b) => (a.id === b.id);
  // Add new tags to the current list of tags removing duplicates.
  const newTags = utils.union(tags, flashcard.tags, idComparator);
  // Update flashcard with new information.
  const newFlashcardContainsCurrentTag = utils.contains(flashcard.tags, {id: selectedTagId}, idComparator);
  const newFlashcards = flashcards.reduce((memo, f) => {
    if (f.id === flashcard.id) {
      if (newFlashcardContainsCurrentTag) {
        memo.push(flashcard);
      }
    } else {
      memo.push(f);
    }
    return memo;
  }, []);
  const hasBeenDeleted = newFlashcards.length < flashcards.length;
  const newIndex = hasBeenDeleted
    ? flashcards.length - 1 > 0
    ? Math.min(selectedFlashcardIndex, flashcards.length - 2)
    : null
    : selectedFlashcardIndex;

  return {
    tags: newTags,
    flashcards: newFlashcards,
    selectedFlashcardIndex: newIndex,
    flashcardInDialog: null
  };
}

export function deleteFlashcard(flashcard, prevState) {
  const { flashcards, selectedFlashcardIndex } = prevState;

  const newFlashcards = flashcards.filter(f => {
    return f.id !== flashcard.id;
  });
  const newIndex = flashcards.length - 1 > 0
    ? Math.min(selectedFlashcardIndex, flashcards.length - 2)
    : null;

  return {
    flashcards: newFlashcards,
    selectedFlashcardIndex: newIndex
  }
}
