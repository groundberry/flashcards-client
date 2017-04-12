import * as utils from './utils';

const objectComparator = (a, b) => (a.id === b.id);

describe('utils', () => {
  describe('findIndex', () => {
    it('returns the index of an element in an array of numbers', () => {
      const arr = [1, 2, 2, 3];
      expect(utils.findIndex(arr, 2)).toBe(1);
    });

    it('returns the index of an element in an array of objects', () => {
      const arr = [
        {id: 1, name: 'foo'},
        {id: 2, name: 'bar'},
        {id: 2, name: 'bar'}
      ];
      expect(utils.findIndex(arr, {id: 2}, objectComparator)).toBe(1);
    });
  });

  describe('contains', () => {
    it('returns true if element is in an array of numbers', () => {
      const arr = [1, 2, 2, 3];
      expect(utils.contains(arr, 2)).toBe(true);
    });

    it('returns true if element is in an array of objects', () => {
      const arr = [
        {id: 1, name: 'foo'},
        {id: 2, name: 'bar'},
        {id: 2, name: 'bar'}
      ];
      expect(utils.contains(arr, {id: 2}, objectComparator)).toBe(true);
    });
  });

  describe('unique', () => {
    it('returns the unique elements in an array of numbers', () => {
      const arr = [1, 2, 2, 3];
      expect(utils.unique(arr)).toEqual([1, 2, 3]);
    });

    it('returns the unique elements in an array of objects', () => {
      const arr = [
        {id: 1, name: 'foo'},
        {id: 2, name: 'bar'},
        {id: 2, name: 'bar'}
      ];
      expect(utils.unique(arr, objectComparator)).toEqual([
        {id: 1, name: 'foo'},
        {id: 2, name: 'bar'}
      ]);
    });
  });

  describe('union', () => {
    it('returns the union of two arrays of numbers', () => {
      const arr1 = [1, 2, 3];
      const arr2 = [2, 3, 4];
      expect(utils.union(arr1, arr2)).toEqual([1, 2, 3, 4]);
    });

    it('returns the union of two arrays of objects', () => {
      const arr1 = [{id: 1, name: 'foo'}, {id: 2, name: 'bar'}];
      const arr2 = [{id: 2, name: 'bar'}, {id: 3, name: 'baz'}];
      expect(utils.union(arr1, arr2, objectComparator)).toEqual([
        {id: 1, name: 'foo'},
        {id: 2, name: 'bar'},
        {id: 3, name: 'baz'}
      ]);
    });
  });

  describe('sortObjects', () => {
    it('returns a sorted array of objects', () => {
      const arr = [{name: 'Foo'}, {name: 'Bar'}];
      expect(utils.sortObjects(arr, 'name')).toEqual([
        {name: 'Bar'},
        {name: 'Foo'}
      ]);
    });

    it('does not modify the original array', () => {
      const arr = [{name: 'Foo'}, {name: 'Bar'}];
      const sortedArr = utils.sortObjects(arr, 'name');
      expect(sortedArr).not.toBe(arr);
    });
  });
});
