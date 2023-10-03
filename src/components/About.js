import React from "react";
import "./About.css";

const About = () => {
  return (
    <>
      <main className="my-5">
        <section class="about-section">
          <h2>Welcome to MyNoteBook App</h2>
          <p>
            MyNoteBook App is an exceptional web application that empowers you
            to organize your thoughts, ideas, and important information
            effortlessly.
          </p>
          <p>
            Our mission is to simplify your life by providing a reliable and
            user-friendly platform for note-taking and retrieval. With
            MyNoteBook App, you're in control of your notes anytime, anywhere.
          </p>
        </section>
        <section class="praise-section">
          <h2>Why Users Love MyNoteBook App</h2>
          <ul>
            <li>Intuitive and easy-to-use interface</li>
            <li>Seamless note storage and retrieval</li>
            <li>Secure and private note management</li>
            <li>Customizable for your unique needs</li>
            <li>Access your notes on any device</li>
            <li>Never lose another important idea</li>
          </ul>
        </section>
      </main>
      <footer>
        <p>&copy; 2023 Abdus Samad</p>
      </footer>
    </>
  );
};

export default About;
