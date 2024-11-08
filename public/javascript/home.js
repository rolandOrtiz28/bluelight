const words = ["Innovation", "Support", "Solutions", "Growth", "Excellence"];
  let index = 0;

  function cycleWords() {
    const textElement = document.getElementById("animatedText");
    textElement.textContent = words[index];
    index = (index + 1) % words.length;
  }

  setInterval(cycleWords, 2000); // Change word every 2 seconds

  // Review Section:
  let reviewContainer = document.querySelector(".review-container");

function pauseAnimation() {
  reviewContainer.style.animationPlayState = "paused";
}

function resumeAnimation() {
  reviewContainer.style.animationPlayState = "running";
}

const ctx = document.getElementById('analyticsChart').getContext('2d');

const analyticsChart = new Chart(ctx, {
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
            easing: 'easeInOutBounce'
        }
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
        body: JSON.stringify({ name, email, subject, message }), // Send data as JSON
      });
      
      const result = await response.json();
      
      // Display the response message with some fun styles
      responseMessage.innerHTML = `<p>${result.message}</p>`;
      responseMessage.style.display = 'block';
      responseMessage.style.color = '#28a745';
      responseMessage.style.fontWeight = 'bold';
      
      // Clear the form fields
      this.reset();
    } catch (error) {
      responseMessage.innerHTML = `<p>Oops! Something went wrong. Try again later.</p>`;
      responseMessage.style.display = 'block';
      responseMessage.style.color = '#dc3545';
      responseMessage.style.fontWeight = 'bold';
    }
  });

