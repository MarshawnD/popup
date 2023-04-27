class MyClass {
    #popup = document.getElementById('popup');
    #isVisible = false;

    #popupIsVisible() {
        if (document.cookie.includes('popupClosed=true')) {
          // If the cookie is set, don't show the popup
          return false;
        }
        // Otherwise, show the popup
        return this.#isVisible;
      }
      
    #updatePopupVisibility() {
      if (this.#popupIsVisible()) {
        this.#popup.style.display = 'flex';
      } else {
        this.#popup.style.display = 'none';
      }
    }

    handleScroll() {
        // Get the height of the document and the current scroll position
        const documentHeight = document.body.clientHeight;
        const scrollPosition = window.scrollY;

        // Calculate the scroll depth as a percentage of the document height
        const scrollDepthPercentage = (scrollPosition / documentHeight) * 100;

        // Set the scroll depth percentage at which the popup should be triggered
        const triggerScrollDepthPercentage = 20;

        // Check if the user has scrolled beyond the trigger scroll depth percentage
    if (scrollDepthPercentage > triggerScrollDepthPercentage) {
        // Set a timer to add the "fade-in" class to the popup element
        setTimeout(() => {
          this.#popup.classList.add('fade-in');
          this.#isVisible = true;
          this.#updatePopupVisibility();
        }, 2000); // Delay the animation by 2 seconds (2000 milliseconds)
        
        console.log(`${this.#isVisible} : VISIBILE : ${scrollDepthPercentage}%`);
      } else {
        console.log(`${this.#isVisible} : HIDDEN : ${scrollDepthPercentage}%`);
      }
    }

    handleClick() {
        // Hide the popup
        this.#isVisible = false;
        // Remove the popup element from the DOM
        this.#popup.remove();
        // Set a cookie to indicate that the user has closed the popup
        // document.cookie = 'popupClosed=true; max-age=60'; // Expires in 1 day (86400) 1hr(3600)
      }
  }

  const myClass = new MyClass();
  window.addEventListener('scroll', () => myClass.handleScroll());
  const xOut = document.getElementById('close');
  xOut.addEventListener('click', () => myClass.handleClick());