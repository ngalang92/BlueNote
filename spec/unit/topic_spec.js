const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;

describe("Topic", () => {

  beforeEach((done) => {
    this.topic;
    this.post;
    sequelize.sync({force: true}).then((res) => {
      Topic.create({
        title: "New music from your favorite artists",
        description: "A compilation of songs from recent albums."
      })
      .then((topic) => {
        this.topic = topic;

        Post.create({
          title: "My debut EP",
          body: "Here's a new album I made.",
          topicId: this.topic.id
        })
        .then((post) => {
          this.post = post;
          done();
        });
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });

  });
  describe("#create()", () => {

     it("should create a topic object with a title and description", (done) => {
       Topic.create({
         title: "Synth-topia",
         description: "Forum and discussion on new and classic synthesizers"
       })
       .then((topic) => {
         expect(topic.title).toBe("Synth-topia");
         expect(topic.description).toBe("Forum and discussion on new and classic synthesizers");
         done();
       })
       .catch((err) => {
         console.log(err);
         done();
       });
     });

     it("should not create a topic with missing title, or description", (done) => {
       Topic.create({
         title: "Synth-topia"
       })
       .then((topic) => {
         done();
       })
       .catch((err) => {
         expect(err.message).toContain("Topic.description cannot be null");
         done();
       })
     });

   });
  describe("#getPosts()", () => {

    it("should return an array of posts associated with topic", (done) => {

      this.topic.getPosts()
      .then((associatedPosts) => {
        expect(associatedPosts[0].title).toBe("My debut EP");
        expect(associatedPosts[0].body).toBe("Here's a new album I made.");
        expect(associatedPosts[0].topicId).toBe(this.topic.id);
        done();
      });

    });

  });
});
