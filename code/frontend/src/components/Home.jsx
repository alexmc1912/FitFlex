import React from "react";
import styles from "./Home.module.css"; // Import modular styles from Home.module.css

const Home = () => {
  // This function smoothly scrolls to the features section when the user presses the button.
  const scrollToContent = () => {
    document.getElementById("features").scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Train Smarter, Get Stronger!</h1>
          <p>Advanced fitness coaching to help you reach your goals.</p>
          <button className={styles.ctaBtn} onClick={scrollToContent}>Start Your Journey</button>
        </div>
      </section>

      <section id="features" className={styles.features}>
        <div className={styles.feature}>
          <img src="/icons/dumbbell.png" alt="Workout Tracking" />
          <h3>Workout Creation</h3>
          <p>Track your progress and improve every day.</p>
        </div>
        <div className={styles.feature}>
          <img src="/icons/stretching-exercises.png" alt="AI Workouts" />
          <h3>Recovery Tips</h3>
          <p>Recovery tips to re-energise your body!</p>
        </div>
        <div className={styles.feature}>
          <img src="/icons/healthy-heart.png" alt="Nutrition" />
          <h3>Nutrition Tracking</h3>
          <p>Manage your meals to become the best version of you!</p>
        </div>
      </section>

      <section className={styles.testimonials}>
        <h2>What Our Users Say</h2>
        <div className={styles.testimonial}>
          <p>"This app transformed my fitness journey!"</p>
          <h4>- Alex D.</h4>
        </div>
        <div className={styles.testimonial}>
          <p>"I love how easy it is to track my progress!"</p>
          <h4>- Jamie R.</h4>
        </div>
      </section>

      <footer className={styles.footer}>
        <p>&copy; 2025 Fitness App. All rights reserved.</p>
      </footer>
    </div>
    
  );
};

export default Home;
