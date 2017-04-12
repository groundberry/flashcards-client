export function getQueryParams() {
  let query = window.location.search.substring(1);
  let pairs = query.split('&').map((str) => str.split('='));
  return pairs.reduce((memo, pair) => {
    memo[pair[0]] = pair[1];
    return memo;
  }, {});
}

const baseApiUrl = 'https://flashcards-server.herokuapp.com';

export function fetchUserDetails(options) {
  const { token } = options;
  const url = `${baseApiUrl}/user?token=${token}`;

  return fetch(url, {
    headers: {
      'Accept': 'application/json'
    },
  })
  .then(response => {
    return response.json();
  })
  .catch(error => {
    console.error('Could not fetch user details', error);
  });
}

export function fetchTags(options) {
  const { token } = options;
  const url = `${baseApiUrl}/tags?token=${token}`;

  return fetch(url, {
    headers: {
      'Accept': 'application/json'
    },
  })
  .then(response => {
    return response.json();
  })
  .catch(error => {
    console.error('Could not fetch tags', error);
  });
}

export function fetchFlashcards(options) {
  const { token, tag } = options;
  const url = `${baseApiUrl}/tags/${tag}/flashcards?token=${token}`;

  return fetch(url, {
    headers: {
      'Accept': 'application/json'
    },
  })
  .then(response => {
    return response.json();
  })
  .catch(error => {
    console.error('Could not fetch flashcards', error);
  });
}

export function createFlashcard(options) {
  const { token, flashcard } = options;
  const url = `${baseApiUrl}/flashcards?token=${token}`;

  return fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ flashcard })
  })
  .then(response => {
    return response.json();
  })
  .catch(error => {
    console.log('Could not create flashcard', error);
  });
}

export function updateFlashcard(options) {
  const { token, flashcard } = options;
  const url = `${baseApiUrl}/flashcards/${flashcard.id}?token=${token}`;

  return fetch(url, {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ flashcard })
  })
  .then(response => {
    return response.json();
  })
  .catch(error => {
    console.log('Could not update flashcard', error);
  });
}

export function deleteFlashcard(options) {
  const { token, flashcard } = options;
  const url = `${baseApiUrl}/flashcards/${flashcard.id}?token=${token}`;

  return fetch(url, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json'
    }
  })
  .catch(error => {
    console.log('Could not delete flashcard', error);
  });
}

export function findIndex(arr, elem, comparator = (a, b) => a === b) {
  for (let i = 0; i < arr.length; i++) {
    if (comparator(elem, arr[i])) {
      return i;
    }
  }
  return -1;
}

export function contains(arr, elem, comparator) {
  return (findIndex(arr, elem, comparator) !== -1);
}

export function unique(arr, comparator) {
  return arr.filter((elem, index) => (
    index === findIndex(arr, elem, comparator)
  ));
}

export function union(arr1, arr2, comparator) {
  return unique(arr1.concat(arr2), comparator);
}

export function sortObjects(arr, key) {
  return arr.slice().sort((a, b) => {
    const valueA = a[key];
    const valueB = b[key];
    if (valueA < valueB) {
      return -1;
    }
    if (valueA > valueB) {
      return 1;
    }
    return 0;
  });
}
