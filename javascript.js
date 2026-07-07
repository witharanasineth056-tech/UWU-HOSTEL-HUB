/*home*/

  /*<!-- Scroll Handling Script -->*/

window.addEventListener('scroll', () => {
            const header = document.querySelector('.site-header');
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });


/*find*/

document.querySelectorAll('.filter-chip').forEach(button => {
            button.addEventListener('click', () => {
                const parent = button.parentElement;
                parent.querySelectorAll('.filter-chip').forEach(btn => {
                    btn.classList.remove('active');
                });
                button.classList.add('active');
                
                // Triggers filtering animation
                const grid = document.querySelector('.hostel-grid');
                grid.style.opacity = '0.5';
                grid.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    grid.style.opacity = '1';
                    grid.style.transform = 'scale(1)';
                }, 300);
            });
        });

/*about*/

 // Simple animation on scroll

      const observerOptions = {
          threshold: 0.1
      };

      const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  entry.target.classList.add('fade-in-visible');
              }
          });
      }, observerOptions);

      document.querySelectorAll('.animate-on-scroll').forEach(section => {
          observer.observe(section);
      });

      // Header scroll effect
      window.addEventListener('scroll', () => {
          const header = document.getElementById('header');
          if (window.scrollY > 20) {
              header.classList.add('scrolled');
          } else {
              header.classList.remove('scrolled');
          }
      });

    



/*filter*/

document.addEventListener("DOMContentLoaded", () => {
    const chips = document.querySelectorAll(".filter-chip");
    const rangeSlider = document.querySelector(".range-slider");
    const distVal = document.getElementById("dist-val");
    const clearBtn = document.querySelector(".btn-secondary");
    const grid = document.querySelector(".hostel-grid");
    
    // Checkboxes පිළිවෙලින් හඳුනා ගැනීම
    const checkboxes = document.querySelectorAll(".checkbox-label input");
    const wifiCheck = checkboxes[0];
    const studyCheck = checkboxes[1];
    const insideCheck = checkboxes[2];
    const securityCheck = checkboxes[3];

    function filterHostels() {
        const activeGenderChip = document.querySelector(".filter-chip.active");
        const selectedGender = activeGenderChip ? activeGenderChip.innerText.trim() : "Boys";
        const maxDistance = rangeSlider ? parseFloat(rangeSlider.value) : 5.0;
        
        const wifiRequired = wifiCheck ? wifiCheck.checked : false;
        const studyRequired = studyCheck ? studyCheck.checked : false;
        const insideRequired = insideCheck ? insideCheck.checked : false;
        const securityRequired = securityCheck ? securityCheck.checked : false;

        const cards = document.querySelectorAll(".hostel-grid > .hostel-card");

        cards.forEach(card => {
            const innerCard = card.querySelector(".hostel-card[data-gender]") || card;
            const cardGender = innerCard.getAttribute("data-gender") || "";
            const cardDistance = parseFloat(innerCard.getAttribute("data-distance") || 0);
            const hasWifi = innerCard.getAttribute("data-wifi") === "true";
            const hasStudy = innerCard.getAttribute("data-study") === "true";
            const hasInside = innerCard.getAttribute("data-inside") === "true";
            const hasSecurity = innerCard.getAttribute("data-security") === "true";

            // Filters සැසඳීම
            const genderMatch = selectedGender === "Mixed" || selectedGender === "All" || cardGender.toLowerCase() === selectedGender.toLowerCase();
            const distanceMatch = (cardDistance <= maxDistance);
            const wifiMatch = (!wifiRequired || hasWifi);
            const studyMatch = (!studyRequired || hasStudy);
            const insideMatch = (!insideRequired || hasInside);
            const securityMatch = (!securityRequired || hasSecurity);

            if (genderMatch && distanceMatch && wifiMatch && studyMatch && insideMatch && securityMatch) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    }

    // Events එකතු කිරීම
    chips.forEach(chip => {
        chip.addEventListener("click", () => {
            chip.parentElement.querySelectorAll(".filter-chip").forEach(btn => btn.classList.remove("active"));
            chip.classList.add("active");
            filterHostels();
        });
    });

    if (rangeSlider) {
        rangeSlider.addEventListener("input", (e) => {
            if (distVal) distVal.innerText = e.target.value + " km";
            filterHostels();
        });
    }

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener("change", filterHostels);
    });

    if (clearBtn) {
        clearBtn.addEventListener("click", () => {
            chips.forEach((chip, index) => {
                if (index === 2) {
                    chip.classList.add("active");
                } else {
                    chip.classList.remove("active");
                }
            });
            if (rangeSlider) rangeSlider.value = 5.0;
            if (distVal) distVal.innerText = "5.0 km";
            [wifiCheck, studyCheck, insideCheck, securityCheck].forEach(checkbox => {
                if (checkbox) checkbox.checked = false;
            });
            filterHostels();
        });
    }

    // මුලින්ම Run කිරීම
    filterHostels();
});