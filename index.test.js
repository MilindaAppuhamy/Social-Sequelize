const { Comment, Like, Post, Profile, User } = require("./index");
const { db } = require("./db/connection.js");
const users = require("./seed/users.json");
const profiles = require("./seed/profiles.json");
const posts = require("./seed/posts.json");
const comments = require("./seed/comments.json");
const likes = require("./seed/likes.json");

describe("Social Sequelzie Test", () => {
  beforeAll(async () => {
    await db.sync({ force: true });
  });

  test("User and Profile is associated correctly", async function () {
    //create user
    const user = await User.create(users[0]);
    //create profile
    const profile = await Profile.create(profiles[0]);
    //associate
    await user.setProfile(profile);
    //test
    const userWithProfile = await User.findByPk(1, {
      include: Profile,
    });
    const profileWithUser = await Profile.findByPk(1, {
      include: User,
    });
    //this also checks if the user and profile property only holds one entry
    expect(userWithProfile.Profile instanceof Profile).toBe(true);
    expect(profileWithUser.User instanceof User).toBe(true);
  });

  test("User and Post is associated correctly", async function () {
    //create user
    const user = await User.create(users[1]);
    //create posts
    const post1 = await Post.create(posts[0]);
    const post2 = await Post.create(posts[1]);
    //associate
    await user.setPosts([post1, post2]);
    //test
    const userWithposts = await User.findByPk(2, {
      include: Post,
    });
    const postWithUser = await Post.findByPk(1, {
      include: User,
    });
    expect(userWithposts.Posts[0].UserId).toBe(2);
    expect(userWithposts.Posts[1].UserId).toBe(2);
    // this checks if a post can only hold one user
    expect(Array.isArray(postWithUser)).toBe(false);
  });

  test("Post and Comment is associated correctly", async function () {
    //create post
    const post = await Post.create(posts[2]);
    //create comments
    const comment1 = await Comment.create(comments[0]);
    const comment2 = await Comment.create(comments[1]);
    //associate
    await post.setComments([comment1, comment2]);
    //test
    const postWithComments = await Post.findByPk(3, {
      include: Comment,
    });
    const commentWithPost = await Comment.findByPk(1, {
      include: Post,
    });
    //console.log(JSON.stringify(postWithComments, null, 2));
    expect(postWithComments.Comments[0].PostId).toBe(3);
    expect(postWithComments.Comments[1].PostId).toBe(3);
    // this checks if a comment can only hold one post
    expect(Array.isArray(postWithComments)).toBe(false);
  });

  test("Post and Comment is associated correctly", async function () {
    //create users
    const user1 = await User.create(users[3]);
    const user2 = await User.create(users[4]);
    //create likes
    const like1 = await Like.create(likes[0]);
    const like2 = await Like.create(likes[1]);
    const like3 = await Like.create(likes[2]);
    const like4 = await Like.create(likes[3]);
    //associate
    await user1.setLikes([like1, like2, like3]);
    await like4.setUsers([user1, user2]);
    //test
    const user1_with_likes = await User.findByPk(3, {
      include: Like,
    });
    const like4_with_users = await Like.findByPk(4, {
      include: User,
    });
    //console.log(JSON.stringify(user1_with_likes, null, 2));
    expect(user1_with_likes.Likes[0].user_likes.LikeId).toBe(1);
    expect(like4_with_users.Users[0].user_likes.UserId).toBe(3);
    // this checks if a user can hold many likes
    expect(Array.isArray(user1_with_likes.Likes)).toBe(true);
    // this checks if a like can hold many users
    expect(Array.isArray(like4_with_users.Users)).toBe(true);
  });
});
