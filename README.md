## Demo video
https://youtu.be/m_ssQyUoHwE


## Inspiration
The inspiration behind "Flashify" sprouted from our collective desire to optimize our study habits. We recognized the effectiveness of active recall in retaining information, and we wanted to bridge the gap between traditional handwritten notes and modern digital learning tools. Our goal was to develop a solution that would convert handwritten notes into digital flashcards, making it easier for students and learners to test themselves on the material.

## What it does
"Flashify" is a web application designed to streamline the process of converting handwritten notes into interactive flashcards. Users can upload images of their handwritten notes, and our AI-powered system will convert the text into digital flashcards. These flashcards are not just static; they come alive with the integration of OpenAI API, which generates challenging questions based on the content and formats them into flashcards. Users can then study and test themselves on these flashcards, promoting active recall and enhancing their learning experience.

## How we built it
Authentication and Security: We prioritized user security by implementing a fully authenticated login system with password hashing to protect user data.

AI Handwriting Recognition: We utilized advanced AI techniques with the apilayer to convert handwritten text into digital text, ensuring accuracy and reliability.

OpenAI Integration: Our application integrates seamlessly with the OpenAI API to generate challenging questions and format them into flashcards, adding an element of interactivity to the learning process.

Backend: We used Flask to develop a robust REST API in the backend, ensuring smooth communication between the frontend and the database.

Database: MySQL was our choice for the database, enabling us to efficiently store user data, notes, and flashcard information.

Frontend: For the frontend, we employed React for its flexibility and responsiveness, along with Tailwind CSS for a sleek and modern user interface.

## Challenges we ran into
While developing "Flashify," we encountered several challenges, the most prominent ones being:

Integration: Integrating multiple technologies, including AI handwriting recognition, OpenAI API, and database management, proved to be a complex task that required careful planning and debugging.

Git and Source Control: Coordinating our work and managing version control using Git was another significant challenge, especially in a collaborative environment.

## Accomplishments that we're proud of
Despite the challenges, we're proud to have achieved the following milestones:

Successfully converting handwritten notes into interactive flashcards using AI.
Implementing a secure authentication system with password hashing.
Seamless integration with the OpenAI API, enhancing the learning experience.
Developing an aesthetically pleasing and user-friendly frontend with React and Tailwind CSS.

## What we learned
Our journey with "Flashify" taught us valuable lessons in teamwork, problem-solving, and technical skills. We gained insights into AI integration, security practices, and the intricacies of web development. Moreover, our experience with Git and source control improved our collaboration and version management skills.

## What's next for Flashify
We have exciting plans for the future of "Flashify." Some of our upcoming features and enhancements include:

Sharing Decks: We aim to allow users to share their flashcard decks with others, fostering collaborative learning.
Mobile App: Expanding our platform to mobile devices to cater to a wider audience.
Enhanced Analytics: Implementing analytics to track user progress and provide personalized study recommendations.
