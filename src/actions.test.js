import { createFlashcard, deleteFlashcard, updateFlashcard } from './actions';

describe('actions', () => {
  describe('createFlashcard', () => {
    it('adds the first flashcard to the list', () => {
      const prevFlashcards = [];
      const prevState = {
        flashcards: prevFlashcards,
        tags: [{id: 1}],
        selectedTagId: 1,
        selectedFlashcardIndex: null,
        flashcardInDialog: null
      };
      const newFlashcard = {id: 1, tags: [{id: 1}]};
      const newState = {
        flashcards: prevFlashcards.concat(newFlashcard),
        tags: [{id: 1}],
        selectedFlashcardIndex: 0,
        flashcardInDialog: null
      };
      expect(createFlashcard(newFlashcard, prevState)).toEqual(newState);
    });

    it('adds a flashcard to the list', () => {
      const prevFlashcards = [{id: 1, tags: [{id: 1}]}];
      const prevState = {
        flashcards: prevFlashcards,
        tags: [{id: 1}],
        selectedTagId: 1,
        selectedFlashcardIndex: 0,
        flashcardInDialog: null
      };
      const newFlashcard = {id: 2, tags: [{id: 1}]};
      const newState = {
        flashcards: prevFlashcards.concat(newFlashcard),
        tags: [{id: 1}],
        selectedFlashcardIndex: 0,
        flashcardInDialog: null
      };
      expect(createFlashcard(newFlashcard, prevState)).toEqual(newState);
    });

    it('does not add a flashcard if it does not contain the current tag', () => {
      const prevFlashcards = [{id: 1, tags: [{id: 1}]}];
      const prevState = {
        flashcards: prevFlashcards,
        tags: [{id: 1}],
        selectedTagId: 1,
        selectedFlashcardIndex: 0,
        flashcardInDialog: null
      };
      const newFlashcard = {id: 2, tags: [{id: 2}]};
      const newState = {
        flashcards: prevFlashcards,
        tags: [{id: 1}, {id: 2}],
        selectedFlashcardIndex: 0,
        flashcardInDialog: null
      };
      expect(createFlashcard(newFlashcard, prevState)).toEqual(newState);
    });

    it('adds additional tags to the list removing duplicates', () => {
      const prevFlashcards = [{id: 1, tags: [{id: 1}]}];
      const prevState = {
        flashcards: prevFlashcards,
        tags: [{id: 1}],
        selectedTagId: 1,
        selectedFlashcardIndex: 0,
        flashcardInDialog: null
      };
      const newFlashcard = {id: 2, tags: [{id: 1}, {id: 2}, {id: 3}]};
      const newState = {
        flashcards: prevFlashcards.concat(newFlashcard),
        tags: [{id: 1}, {id: 2}, {id: 3}],
        selectedFlashcardIndex: 0,
        flashcardInDialog: null
      };
      expect(createFlashcard(newFlashcard, prevState)).toEqual(newState);
    });
  });

  describe('updateFlashcard', () => {
    it('updates the first flashcard', () => {
      const prevFlashcards = [{id: 1, tags: [{id: 1}]}, {id: 2, tags: [{id: 1}]}];
      const prevState = {
        tags: [{id: 1}],
        selectedTagId: 1,
        flashcards: prevFlashcards,
        selectedFlashcardIndex: 0,
        flashcardInDialog: null
      };
      const newFlashcard = {id: 1, question: 'Q', tags: [{id: 1}]};
      const newState = {
        flashcards: [newFlashcard, prevFlashcards[1]],
        tags: [{id: 1}],
        selectedFlashcardIndex: 0,
        flashcardInDialog: null
      };
      expect(updateFlashcard(newFlashcard, prevState)).toEqual(newState);
    });

    it('updates the last flashcard', () => {
      const prevFlashcards = [{id: 1, tags: [{id: 1}]}, {id: 2, tags: [{id: 1}]}];
      const prevState = {
        flashcards: prevFlashcards,
        tags: [{id: 1}],
        selectedTagId: 1,
        selectedFlashcardIndex: 0,
        flashcardInDialog: null
      };
      const newFlashcard = {id: 2, question: 'Q', tags: [{id: 1}]};
      const newState = {
        flashcards: [prevFlashcards[0], newFlashcard],
        tags: [{id: 1}],
        selectedFlashcardIndex: 0,
        flashcardInDialog: null
      };
      expect(updateFlashcard(newFlashcard, prevState)).toEqual(newState);
    });

    it('adds additional tags to the list removing duplicates', () => {
      const prevFlashcards = [{id: 1, tags: [{id: 1}]}];
      const prevState = {
        flashcards: prevFlashcards,
        tags: [{id: 1}],
        selectedTagId: 1,
        selectedFlashcardIndex: 0,
        flashcardInDialog: null
      };
      const newFlashcard = {id: 1, tags: [{id: 1}, {id: 2}, {id: 3}]};
      const newState = {
        flashcards: [newFlashcard],
        tags: [{id: 1}, {id: 2}, {id: 3}],
        selectedFlashcardIndex: 0,
        flashcardInDialog: null
      };
      expect(updateFlashcard(newFlashcard, prevState)).toEqual(newState);
    });

    it('removes the flashcard when tag is deleted', () => {
      const prevFlashcards = [{id: 1, tags: [{id: 1}]}];
      const prevState = {
        flashcards: prevFlashcards,
        tags: [{id: 1}],
        selectedTagId: 1,
        selectedFlashcardIndex: 0,
        flashcardInDialog: null
      };
      const newFlashcard = {id: 1, tags: [{id: 2}]};
      const newState = {
        flashcards: [],
        tags: [{id: 1}, {id: 2}],
        selectedFlashcardIndex: null,
        flashcardInDialog: null
      };
      expect(updateFlashcard(newFlashcard, prevState)).toEqual(newState);
    });
  });

  describe('deleteFlashcard', () => {
    it('removes the first flashcard from the list', () => {
      const prevState = {
        flashcards: [{id: 1}, {id: 2}, {id: 3}],
        selectedFlashcardIndex: 0
      };
      const newState = {
        flashcards: [{id: 2}, {id: 3}],
        selectedFlashcardIndex: 0
      };
      expect(deleteFlashcard({id: 1}, prevState)).toEqual(newState);
    });

    it('removes a flashcard in the middle from the list', () => {
      const prevState = {
        flashcards: [{id: 1}, {id: 2}, {id: 3}],
        selectedFlashcardIndex: 1
      };
      const newState = {
        flashcards: [{id: 1}, {id: 3}],
        selectedFlashcardIndex: 1
      };
      expect(deleteFlashcard({id: 2}, prevState)).toEqual(newState);
    });

    it('removes the last flashcard from the list', () => {
      const prevState = {
        flashcards: [{id: 1}, {id: 2}, {id: 3}],
        selectedFlashcardIndex: 2
      };
      const newState = {
        flashcards: [{id: 1}, {id: 2}],
        selectedFlashcardIndex: 1
      };
      expect(deleteFlashcard({id: 3}, prevState)).toEqual(newState);
    });

    it('removes the only flashcard from the list', () => {
      const prevState = {
        flashcards: [{id: 1}],
        selectedFlashcardIndex: 0
      };
      const newState = {
        flashcards: [],
        selectedFlashcardIndex: null
      };
      expect(deleteFlashcard({id: 1}, prevState)).toEqual(newState);
    });
  });
});
