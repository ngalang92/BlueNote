BlueNote

This is a reddit-like app where users can upload posts on topics that interest them and comment on theirs and other people's posts. Users will be able to upvote or downvote on posts and also be able to favorite posts, which will be accessible via their public profile, which displays recent comments, posts, and favorites of the user. Admin users can add new topics, flair, and administer CRUD actions on any users content.

To run the app locally, enter the app directory and run this in your command line terminal:

touch .env

Then find .env.sample provided in the public repository directory.

Copy and paste the contents of .env.sample file into .env file.

Configure the SQL database by running this in your command line terminal:

createdb BlueNote-dev

sequelize db:migrate

If desired, you may also seed the database by running the following:

sequelize db:seed:all

Otherwise, you can use the app as an admin by completing the sign up page and then running the following:

psql BlueNote-dev
UPDATE "Users" SET role = 'admin' WHERE id = 1;

Finally, run "npm start"
