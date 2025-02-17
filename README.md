# CST438 Project 1
# Project 01 Retrospective and overview

[Github Repo](https://github.com/alberto93927/CST438_project1)

## Overview
This is a workout plan app that makes use of an API we found here. It allows users to create their own workout split for the week, add exercises from the API to their workout split, and explore exercises for many muscles. 

We got styling help for this document from [this guide](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax)

## Introduction

* How was communication managed
 * Communication was managed by communicating through Slack for the most part, if issues came up, we made sure to discuss and solve them during in-person meetings.
* How many stories/issues were initially considered
 * 22 issues
* How many stories/issues were completed


### James Lindfors
1. James's pull requests are [here](https://github.com/alberto93927/CST438_project1/issues?q=is%3Apr%20author%3Ajameslindfors%20)
1. James's Github issues are [here](https://github.com/alberto93927/CST438_project1/issues?q=is%3Aissue%20author%3Ajameslindfors)

#### What was your role / which stories did you work on
James worked on handling the authentication and user/profile management. He configured the “Sign in with Google” functionality and allowed for the creation of users and an associated profile in the SQLite database. He also made some contributions to the profile tab with a reusable ‘useProfile’ hook.

+ What was the biggest challenge?
  + The biggest challenge was associating a Google User id with a local SQLite user and then creating a profile from that.
+ Why was it a challenge?
  + It could have been simplified by merging everything into one table but for scalability, it was better to keep things separate. This added an additional layer of complexity in reliability managing all the ID’s.
  + How was the challenge addressed?
  + I sat down and drew out the flow of the onboarding process and then looked through the files to make sure I knew where everything was being called and when. This also allowed me to refactor and improve previously written sign in code.
+ Favorite / most interesting part of this project
  + Getting to use the google sign-in library.
+ If you could do it over, what would you change?
  + I would make sure everyone on the team has a clear understanding of what the end product should look like.
+ What is the most valuable thing you learned?
  + The most valuable thing I learned was making sure things remained consistent across many team members systems. 

### Cris Bravo
1.Cris’s pull requests are
[here](https://github.com/alberto93927/CST438_project1/pulls?q=is%3Apr+is%3Aclosed+author%3Acbravo20)
1.Cris’s Github issues are
[here](https://github.com/alberto93927/CST438_project1/issues?q=is%3Aissue%20state%3Aopen%20author%3Acbravo20)

#### What was your role / which stories did you work on
Cris primarily worked on consuming the API and displaying its data. He created the Explore page to explore and learn about different exercises, such as what they targeted and how to perform them. He also configured the AddWorkout page to allow a user to add an exercise to their workout plan, specifying how many reps and sets they would like. 

+ What was the biggest challenge?
  +The biggest challenge was understanding how the SQLite database worked for an Expo React application.
+ Why was it a challenge?
  +It was a challenge because I have limited experience with Expo React and I wasn’t quite used to how it handled databases.
  + How was the challenge addressed?
 +The challenge was addressed by a mixture of looking at and trying to understand the database code of the group member who designed the database for the project. With that and doing some research, whether it be online documentation or YouTube tutorials, I was better able to understand it. 
+ Favorite / most interesting part of this project
 +Getting to learn Expo React was my favorite part of the project, it is definitely a new technology I would like to create a personal project with.
+ If you could do it over, what would you change?
 + I would make a more in depth plan as to how the project should work together at the start, in order to iron out most issues before they pop up. 
+ What is the most valuable thing you learned?
  +The most valuable thing I learned was how to use GitHub in a group project.

### Alberto Garcia

1.Alberto’s Pull Requests are
[here](https://github.com/alberto93927/CST438_project1/issues?q=state%3Aclosed%20is%3Apr%20author%3A%40me) 
1.Alberto’s GitHub issues are 
[here](https://github.com/alberto93927/CST438_project1/issues?q=is%3Aissue%20state%3Aclosed%20assignee%3Aalberto93927) 

#### What was your role / which stories did you work on
Alberto’s role in the project was mostly backend work. Alberto designed the schema for the database. He created the database and was in charge of hooking up the frontend to the backend. Additionally, he did some frontend work towards the end as well. Such as helping in creating the editWorkout page. This allowed the user to interact with the database, and store information that they wanted to.

+ What was the biggest challenge?
  + For me, one of the biggest challenges was figuring out how the navigation worked when I started doing frontend work.
+ Why was it a challenge?
  + This was challenging because by the time I got the database working, the project had already grown exponentially. It was challenging figuring out how everything was connected.
  + How was the challenge addressed?
  + The challenge was addressed by walking through the project, and taking a moment to see what part was working at the moment I was running the application. Reading documentation also helped a lot.
+ Favorite / most interesting part of this project
  + My favorite part of the project was being exposed to so many different technologies, and having to adapt quickly to build a functional application. That urgency is exciting. It makes it feel like there’s real pressure, which I enjoy.
+ If you could do it over, what would you change?
  + If I could do it over again, I would like to spend more time initially planning. I feel that with the diagrams that Moe made, it made everything so much easier. Those diagrams made me realize the importance of planning, and how much it expedites things down the line.
+ What is the most valuable thing you learned?
  + I would say the most valuable thing I learned was working with completely new people. I couldn’t ask for a better team. Everyone is very knowledgeable in their own way, and it made for a very fun experience working with so many talented people. It definitely motivated me to do better.

### Moe Karaki

1.Moe’s Pull Requests are
[here](https://github.com/alberto93927/CST438_project1/issues?q=is%3Apr%20author%3A%40me%20) 
1.Moe’s GitHub issues are 
[here](https://github.com/alberto93927/CST438_project1/issues?q=is%3Aissue%20author%3Amoekarakii%20assignee%3Amoekarakii%20)

#### What was your role / which stories did you work on
Moe’s role was to design the front end aspect of the project, how pages navigate/connect to each other and how they appear to the user. By the use of effective planning and vision, he created a layout of the entire application. 
Although the design was created in the final week of the project due date, it allowed the group to visualize the end goal and not just add random features. Prior to that, designed the homepage and its functionality, which takes the user to the specific workout day they clicked. The workout day page allows the user to view the set of workouts they have for that day and allows them to add, delete, edit, and change the workout type of day instantly (using async storage).

+ What was the biggest challenge?
The biggest challenge for me was the packages and dependencies functioning poorly on my computer. I was constantly running into errors and issues with new versions of the project being pulled to my computer.

+ Why was it a challenge?
This was a challenge for me since it was my first time working with React Native, especially in such a small time frame. I also did not know much Typescript which made it much more difficult to debug issues i ran into.

+ How was the challenge addressed?
I got help from my very knowledgeable group members, in specific James helped me out when it came to issues with my node_modules file, gradle, and android file issues. Through this, I learned how to deal with some of the issues on my own when they showed up again.

+ Favorite / most interesting part of this project
My favorite part of this project was the diagrams I made. I instantly got excited about the end goal once I finished the drawings and gave me a glimpse of the finished product. By doing this, not only did I have an idea of what everything should look like, but I would have it open on my computer while I coded and my productivity increased by tenfold- just because I knew exactly what I wanted to implement.

+ If you could do it over, what would you change?
I would have drawn the Diagram in the first week and that would have allowed us to create the features quicker, and possibly add even more! 

+ What is the most valuable thing you learned?
I was uncomfortable a lot with this process working with React native but having a project due while using it alongside pulling data from an API and using typescript? It forced me to learn and embrace my adaptability which is a quality I know I will need in my career.



## Conclusion

- How successful was the project?
  - Think in terms of what did you set out to do and what actually got done?
  The project was very successful. As far as the vision we had for the project in the beginning, compared to what we managed to accomplish in the end, it’s pretty close. The onboarding is nice, the flow of the application is smooth, the API is working well, the frontend looks great, and the database is fully functional. 
- What was the largest victory?
  The largest victory by far was developing excellent troubleshooting skills. Whenever one of us would have an issue, it was super specific to our machines that it was very difficult to offer help. However, we became very comfortable with troubleshooting, and figuring out how to fix the issues.
- Final assessment of the project
  The project was a great learning experience. It took everyone out of their comfort zone. Working together helped keep the project moving forward because everyone was willing to offer help whenever needed. That made the project run more smoothly, and it opened up the door to new ideas.


