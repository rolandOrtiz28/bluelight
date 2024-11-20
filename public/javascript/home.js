const words = ["Innovation", "Support", "Solutions", "Growth", "Excellence"];
  let index = 0;

  function cycleWords() {
    const textElement = document.getElementById("animatedText");
    textElement.textContent = words[index];
    index = (index + 1) % words.length;
  }

  setInterval(cycleWords, 2000); // Change word every 2 seconds

  let reviewTrack = document.querySelector(".review-track");

  function pauseAnimation() {
    reviewTrack.style.animationPlayState = "paused";
  }
  
  function resumeAnimation() {
    reviewTrack.style.animationPlayState = "running";
  }
    
document.addEventListener('DOMContentLoaded', () => {
  // Register ScrollTrigger with GSAP
  gsap.registerPlugin(ScrollTrigger);

  const canvas = document.getElementById('analyticsChart');
  if (canvas) {
    const ctx = canvas.getContext('2d');

    // Trigger chart animation when it scrolls into view
    ScrollTrigger.create({
      trigger: '#analyticsChart',
      start: 'top 80%',
      onEnter: () => {
        console.log("Entering viewport and initializing chart...");

        // Destroy previous instance if it exists and is a Chart instance
        if (window.analyticsChart && typeof window.analyticsChart.destroy === 'function') {
          window.analyticsChart.destroy();
          console.log("Destroyed previous chart instance.");
        } else {
          console.log("No previous chart instance to destroy.");
        }

        // Create a new chart instance
        window.analyticsChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
              label: 'Growth',
              data: [10, 20, 35, 50, 65, 80, 95, 110, 125, 140, 160, 180],
              borderColor: '#00bfff',
              backgroundColor: 'rgba(0, 150, 255, 0.1)',
              borderWidth: 2,
              tension: 0.4,
              fill: true,
              pointRadius: 0,
              pointHitRadius: 5,
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
                grid: {
                  color: 'rgba(255, 255, 255, 0.1)',
                },
                ticks: {
                  color: '#ffffff',
                  stepSize: 20
                }
              },
              x: {
                grid: {
                  display: false
                },
                ticks: {
                  color: '#ffffff'
                }
              }
            },
            plugins: {
              legend: {
                display: false
              }
            },
            animation: {
              duration: 2000,
              easing: 'linear',
              onComplete: () => {
                console.log("Chart animation completed.");
              }
            }
          }
        });

        // Force a chart update to render
        window.analyticsChart.update();
        console.log("Chart created and update forced.");
      }
    });
  } else {
    console.error("Canvas element with ID 'analyticsChart' not found.");
  }
});





document.addEventListener('DOMContentLoaded', () => {
  // Register ScrollTrigger with GSAP
  gsap.registerPlugin(ScrollTrigger);

  // Number Rolling Animation for Metrics
  const metrics = document.querySelectorAll('.metric-value');

  metrics.forEach(metric => {
      const targetValue = parseInt(metric.getAttribute('data-target'), 10);

      // GSAP Animation
      gsap.fromTo(metric, { innerHTML: 0 }, {
          innerHTML: targetValue,
          duration: 2,
          ease: 'power1.out',
          scrollTrigger: {
              trigger: metric,
              start: 'top 80%',
              toggleActions: 'restart pause resume none',
          },
          snap: { innerHTML: 1 },
          onUpdate: function() {
              metric.innerHTML = Math.round(metric.innerHTML).toLocaleString();
          }
      });
  });

  // Chart.js Animation for the Line Chart
  const ctx = document.getElementById('analyticsChart').getContext('2d');
  let chartInitialized = false;

  // Trigger chart animation when it scrolls into view
  ScrollTrigger.create({
      trigger: '#analyticsChart',
      start: 'top 80%',
      onEnter: () => {
          if (!chartInitialized) {
              new Chart(ctx, {
                  type: 'line',
                  data: {
                      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                      datasets: [{
                          label: 'Growth',
                          data: [10, 20, 35, 50, 65, 80, 95, 110, 125, 140, 160, 180],
                          borderColor: '#00bfff',
                          backgroundColor: 'rgba(0, 150, 255, 0.1)',
                          borderWidth: 2,
                          tension: 0.4,
                          fill: true,
                          pointRadius: 0,
                          pointHitRadius: 5,
                      }]
                  },
                  options: {
                      scales: {
                          y: {
                              beginAtZero: true,
                              grid: {
                                  color: 'rgba(255, 255, 255, 0.1)',
                              },
                              ticks: {
                                  color: '#ffffff',
                                  stepSize: 20
                              }
                          },
                          x: {
                              grid: {
                                  display: false
                              },
                              ticks: {
                                  color: '#ffffff'
                              }
                          }
                      },
                      plugins: {
                          legend: {
                              display: false
                          }
                      },
                      animation: {
                          duration: 2000,
                          easing: 'linear',
                          onProgress: function(animation) {
                              const chart = animation.chart;
                              const datasetMeta = chart.getDatasetMeta(0); // Assumes only one dataset
                              datasetMeta.data.forEach((point, index) => {
                                  const progress = animation.currentStep / animation.numSteps;
                                  point.x = point.base + progress * (point.x - point.base);
                                  point.y = point.baseY + progress * (point.y - point.baseY);
                              });
                              chart.draw();
                          }
                      }
                  }
              });
              chartInitialized = true;
          }
      }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  // Number Rolling Animation for Customer Service Metrics
  const customerMetrics = document.querySelectorAll('.customer-service-analytics-section .metric-value');

  customerMetrics.forEach(metric => {
    const targetValue = parseInt(metric.getAttribute('data-target'), 10);

    gsap.fromTo(metric, { innerHTML: 0 }, {
      innerHTML: targetValue,
      duration: 2,
      ease: 'power1.out',
      snap: { innerHTML: 1 },
      onUpdate: function() {
        metric.innerHTML = Math.round(metric.innerHTML).toLocaleString();
      }
    });
  });

});


document.addEventListener('DOMContentLoaded', () => {
  // Register GSAP ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  // Pop-up animation for each service-item
  gsap.from(".service-item", {
    opacity: 0,
    y: 50,
    scale: 0.95,
    duration: 1,
    stagger: 0.2, // Delay between each item’s animation
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".services-section",
      start: "top 80%",
      toggleActions: 'restart pause resume none',
    }
  });


});


document.addEventListener('DOMContentLoaded', () => {
  // Register GSAP ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  // Fade-in animation for the customer-logo-section
  gsap.from(".customer-logo-section", {
    opacity: 0,
    duration: 1.5,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".customer-logo-section",
      start: "top 80%", // Start the animation when the section is 80% from the top of the viewport
      toggleActions: 'restart pause resume none',
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
    // Register GSAP ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
  
    // Fade-in and slide-up animation for the header
    gsap.from(".logo-label", {
      opacity: 0,
      y: 30,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".customer-logo-section",
        start: "top 80%",
        toggleActions: 'restart pause resume none',
      }
    });
  
    // Staggered animation for each logo box
    gsap.from(".logo-box", {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power3.out",
      stagger: 0.3, // Delays each logo box for a cascading effect
      scrollTrigger: {
        trigger: ".customer-logo-section",
        start: "top 80%",
        toggleActions:'restart pause resume none',
      }
    });
  });


  document.getElementById('contactForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent default form submission

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    const responseMessage = document.getElementById('responseMessage');

    try {
      const response = await fetch('/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, subject, message }),
      });
    
      const result = await response.json();
    
      if (!response.ok) {
        // Display the Joi validation error message
        responseMessage.innerHTML = `<p>${result.error || "Something went wrong."}</p>`;
        responseMessage.style.color = '#dc3545';
        responseMessage.style.fontWeight = 'bold';
        responseMessage.style.display = 'block';
      } else {
        // Display the success message
        responseMessage.innerHTML = `<p>${result.message}</p>`;
        responseMessage.style.color = '#28a745';
        responseMessage.style.fontWeight = 'bold';
        responseMessage.style.display = 'block';
        this.reset();
      }
    } catch (error) {
      responseMessage.innerHTML = `<p>Oops! Something went wrong. Try again later.</p>`;
      responseMessage.style.color = '#dc3545';
      responseMessage.style.fontWeight = 'bold';
      responseMessage.style.display = 'block';
    }
  });

  document.addEventListener("DOMContentLoaded", function() {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Team Section Scroll-Triggered Animation
    gsap.from(".team-member", {
      y: -50,
      opacity: 0,
      duration: 0.8,
      ease: "bounce.out",
      stagger: 0.2,
      scrollTrigger: {
        trigger: "#our-team",
        start: "top 80%",
        toggleActions:'restart pause resume none',
      }
    });
  });

  document.addEventListener("DOMContentLoaded", function() {
   
    gsap.registerPlugin(ScrollTrigger);

    
    gsap.from(".about-img", {
      x: -200,
      opacity: 0,
      duration: 1.5,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".About-Section",
        start: "top 80%",
        toggleActions:'restart pause resume none',
      }
    });

    gsap.from(".about-text", {
      x: 200,
      opacity: 0,
      duration: 1.5,
      ease: "power2.out",
      delay: 0.5,
      scrollTrigger: {
        trigger: ".About-Section",
        start: "top 80%",
        toggleActions:'restart pause resume none',
      }
    });

  });


  document.querySelectorAll('.team-member').forEach(member => {
    const message = document.createElement('div');
    message.classList.add('speech-bubble');
    message.textContent = member.getAttribute('data-message');
    member.appendChild(message);
});

document.querySelectorAll('a.nav-link[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      const offset = document.querySelector('.custom-navbar').offsetHeight; // Navbar height

      if (targetElement) {
          window.scrollTo({
              top: targetElement.offsetTop - offset, // Scroll position accounting for navbar
              behavior: 'smooth' // Smooth scrolling
          });
      }
  });
});
