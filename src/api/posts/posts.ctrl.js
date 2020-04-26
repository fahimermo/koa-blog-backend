let postId = 1; // id -> initial value.

// posts initial data - array
const posts = [
  {
    id: 1,
    title: 'Title',
    body: 'Content',
  },
];

/* building post
POST /api/posts
{ title, body }
*/
exports.write = (ctx) => {
  // REST API's request body = ctx.request.body.
  const { title, body } = ctx.request.body;
  postId += 1;
  const post = { id: postId, title, body };
  posts.push(post);
  ctx.body = post;
};

/* get post list
GET /api/posts
*/
exports.list = (ctx) => {
  ctx.body = posts;
};

/* get a post list
GET /api/posts/:id
*/
exports.read = (ctx) => {
  const { id } = ctx.params;
  // find a post from ID
  // data from parameter is a string so you can convert into a number, or
  // p.id value into a string
  const post = posts.find((p) => p.id.toString() === id);
  // error if no post
  if (!post) {
    ctx.status = 404;
    ctx.body = {
      message: 'No post.',
    };
    return;
  }
  ctx.body = post;
};

/* remove a post
DELETE /api/posts/:id
*/
exports.remove = (ctx) => {
  const { id } = ctx.params;
  // confirm the order of current post with an ID
  const index = posts.findIndex((p) => p.id.toString() === id);
  // error if no post
  if (index === -1) {
    ctx.status = 404;
    ctx.body = {
      message: 'No post.',
    };
    return;
  }
  // remove a index-th number
  posts.splice(index, 1);
  ctx.status = 204; // No Content
};

/* edit a post
PUT /api/posts/:id
{ title, body }
*/
exports.replace = (ctx) => {
  // PUT for replacing data with all
  const { id } = ctx.params;
  // check if the current post's order
  const index = posts.findIndex((p) => p.id.toString() === id);
  // error if no post.
  if (index === -1) {
    ctx.status = 404;
    ctx.body = {
      message: 'No post.',
    };
    return;
  }
  // replace the whole object
  // make a new object except ID
  posts[index] = {
    id,
    ...ctx.request.body,
  };
  ctx.body = posts[index];
};

/* edit a post with a certain field
PATCH /api/posts/:id
{ title, body }
*/
exports.update = (ctx) => {
  // PATCH for given field update
  const { id } = ctx.params;
  // check current post's order
  const index = posts.findIndex((p) => p.id.toString() === id);
  // error if no post
  if (index === -1) {
    ctx.status = 404;
    ctx.body = {
      message: 'No post.',
    };
    return;
  }
  // replace data.
  posts[index] = {
    ...posts[index],
    ...ctx.request.body,
  };
  ctx.body = posts[index];
};
