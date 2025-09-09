import React from "react";
import styles from "./Recovery.module.css"; // This imports the styling for this page.

const Recovery = () => {
  // This function allows for a smooth scroll to the recovery-tips section when we click the button.
  const scrollToContent = () => {
    document.getElementById("recovery-tips").scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={styles.pageContainer}>
      
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Maximize Your Recovery</h1>
          <p>Enhance your training with smart recovery strategies for optimal performance.</p>
          <button className={styles.ctaBtn} onClick={scrollToContent}>Learn More</button>
        </div>
      </section>

      <section id="recovery-tips" className={styles.coloredBlock}>
        <div className={styles.section}>
          <div className={styles.textContent}>
            <h2>Fuel Your Body for Faster Recovery</h2>
            <p>Proper nutrition accelerates muscle repair and replenishes energy stores.</p>
            <ul>
              <li><strong>Protein Intake:</strong> Aim for 20-30g of protein post-workout to support muscle growth.</li>
              <li><strong>Carbohydrates:</strong> Replenish glycogen with whole grains, fruits, and starchy vegetables.</li>
              <li><strong>Healthy Fats:</strong> Include sources like avocados, nuts, and omega-3s to reduce inflammation.</li>
              <li><strong>Micronutrients:</strong> Magnesium, iron, and potassium improve muscle function and prevent cramps.</li>
            </ul>
          </div>
          <img src="/images/nutrition.jpg" alt="Nutrition" className={styles.sectionImage} />
        </div>
      </section>

      <section className={styles.whiteBlock}>
        <div className={styles.section}>
          <img src="/images/stretching.jpg" alt="Stretching" className={styles.sectionImage} />
          <div className={styles.textContent}>
            <h2>Stretching & Mobility</h2>
            <p>Maintain flexibility and prevent injuries with consistent stretching.</p>
            <ul>
              <li><strong>Pre-Workout:</strong> Use dynamic stretching like leg swings and arm circles.</li>
              <li><strong>Post-Workout:</strong> Hold static stretches for 30 seconds to enhance flexibility.</li>
              <li><strong>Foam Rolling:</strong> Reduce soreness and release tight muscles with targeted foam rolling.</li>
              <li><strong>Active Recovery:</strong> Engage in light movement like walking or cycling to prevent stiffness.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className={styles.coloredBlock}>
        <div className={styles.section}>
          <div className={styles.textContent}>
            <h2>Quality Sleep for Peak Performance</h2>
            <p>Muscle repair and growth occur during deep sleep—prioritize rest.</p>
            <ul>
              <li><strong>7-9 Hours Nightly:</strong> Aim for uninterrupted sleep to allow full recovery.</li>
              <li><strong>Optimize Sleep Environment:</strong> Keep your room dark, cool, and free of noise.</li>
              <li><strong>Pre-Sleep Routine:</strong> Reduce screen time and avoid caffeine before bed.</li>
              <li><strong>Short Naps:</strong> A 20-30 minute nap post-training can aid recovery.</li>
            </ul>
          </div>
          <img src="/images/sleep.jpg" alt="Sleep" className={styles.sectionImage} />
        </div>
      </section>

      <section className={styles.whiteBlock}>
        <div className={styles.section}>
          <img src="/images/water.jpg" alt="Hydration" className={styles.sectionImage} />
          <div className={styles.textContent}>
            <h2>Stay Hydrated for Better Performance</h2>
            <p>Proper hydration maintains muscle function and prevents fatigue.</p>
            <ul>
              <li><strong>Daily Intake:</strong> Drink at least 2.5-3 liters of water daily.</li>
              <li><strong>Electrolytes:</strong> Replenish sodium, potassium, and magnesium after intense workouts.</li>
              <li><strong>Pre-Workout Hydration:</strong> Consume 500ml of water 30 minutes before exercise.</li>
              <li><strong>Monitor Hydration:</strong> Check urine color—light yellow means well-hydrated.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className={styles.coloredBlock}>
        <div className={styles.section}>
          <div className={styles.textContent}>
            <h2>Post-Workout Recovery Techniques</h2>
            <p>Enhance muscle repair with science-backed recovery methods.</p>
            <ul>
              <li><strong>Cold Therapy:</strong> Ice baths reduce inflammation and muscle soreness.</li>
              <li><strong>Heat Therapy:</strong> Saunas and hot baths improve circulation and relaxation.</li>
              <li><strong>Compression Gear:</strong> Use compression garments to enhance blood flow.</li>
              <li><strong>Rest Days:</strong> Allow at least one full rest day per week for proper recovery.</li>
            </ul>
          </div>
          <img src="/images/sauna.jpg" alt="Recovery" className={styles.sectionImage} />
        </div>
      </section>

    </div>
  );
};

export default Recovery;

