import api from '../get/posts';

test('get posts', () =>
  api({
    path: '/api/posts',
  })
  .then((res) => {
    expect(res).toMatchSnapshot();
  }),
);

// test('get posts from cache', () => {
//   return api({
//     path: '/api/posts',
//   })
//   .then((res) => {
//     expect(res).toMatchSnapshot();
//   });
// });

test('get posts with params', () =>
  api({
    path: '/api/posts',
    queryStringParameters: {
      foo: 'bar',
    },
  })
  .then((res) => {
    expect(res).toMatchSnapshot();
  }),
);
