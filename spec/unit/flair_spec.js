const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Flair = require("../../src/db/models").Flair;
 describe("Flair", () => {
   beforeEach((done) => {
    this.topic;
    this.flair;
    sequelize.sync({force: true}).then((res) => {
       Topic.create({
        title: "How to Train Your Dog",
        description: "A thorough guide of how to teach your canine commands."
      })
      .then((topic) => {
        this.topic = topic;
        Flair.create({
          name: "Top post",
          color: "Bitcoin 101",
          topicId: this.topic.id
        })
        .then((flair) => {
          this.flair = flair;
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
      it("should create a flair object with a name, color, and assigned topic", (done) => {
       Flair.create({
         name: "Dreamforce Topic",
         color: "Blue",
         topicId: this.topic.id
       })
       .then((flair) => {
         expect(flair.name).toBe("Dreamforce Topic");
         expect(flair.color).toBe("Blue");
         done();
       })
       .catch((err) => {
         console.log(err);
         done();
       });
     });
      it("should not create a flair object with missing name, color, or assigned topic", (done) => {
       Flair.create({
         name: "Dreamforce Topic"
       })
       .then((post) => {
         done();
       })
       .catch((err) => {
         expect(err.message).toContain("Flair.color cannot be null");
         expect(err.message).toContain("Flair.topicId cannot be null");
         done();
       })
     });
    });
  describe("#setTopic()", () => {
     it("should associate a topic and flair together", (done) => {
       Topic.create({
        title: "Basic workout regimen",
        description: "Push-ups, pull-ups, sit-ups."
      })
      .then((newTopic) => {
        expect(this.flair.topicId).toBe(this.topic.id);
        this.flair.setTopic(newTopic)
        .then((flair) => {
           expect(flair.topicId).toBe(newTopic.id);
          done();
         });
      })
    });
   });
  describe("#getTopic()", () => {
      it("should return the associated topic", (done) => {
        this.flair.getTopic()
       .then((associatedTopic) => {
         expect(associatedTopic.title).toBe("How to Train Your Dog");
         done();
       });
      });
   });
 });
