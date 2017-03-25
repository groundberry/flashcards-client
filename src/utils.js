export function getQueryParams() {
  let query = window.location.search.substring(1);
  let pairs = query.split('&').map((str) => str.split('='));
  return pairs.reduce((memo, pair) => {
    memo[pair[0]] = pair[1];
    return memo;
  }, {});
}

const baseApiUrl = 'https://flashcards-server.herokuapp.com';

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

  fetch(url, {
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

  fetch(url, {
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
