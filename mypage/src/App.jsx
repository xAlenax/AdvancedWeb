import React, { useEffect } from "react";
import './styles.css';

function App() {
  useEffect(() => {
    const scrollIndicator = document.getElementById('scrollIndicator');
    const backToTopButton = document.getElementById('backToTop');

    // Smooth scrolling between sections
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth' });
      });
    });

    // Update the scroll indicator and show the back to top button
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / scrollHeight) * 100;
      scrollIndicator.style.width = `${scrollPercent}%`;

      if (scrollTop > 300) {
        backToTopButton.style.display = 'block';
      } else {
        backToTopButton.style.display = 'none';
      }
    });

    // Back to top functionality
    backToTopButton.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    });

    // Cleanup event listeners on unmount
    return () => {
      window.removeEventListener('scroll', () => {});
      backToTopButton.removeEventListener('click', () => {});
    };
  }, []);

  return (
    <div>
      <header>
        <h1>Advanced Web Development - Website</h1>
        <nav>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </header>

      <div id="scrollIndicator" style={{ height: "4px", backgroundColor: "#4CAF50", position: "fixed", top: 0, left: 0, zIndex: 9999 }}></div>

      <main>
        <section id="home" className="section">
          <h2>Home</h2>
          <p>Home section of website!</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vulputate risus vel ipsum volutpat, sit amet faucibus velit dictum. Nulla facilisi. Curabitur gravida, libero ut mollis condimentum, metus velit convallis justo, sed ullamcorper turpis risus non lectus. Vivamus vehicula sollicitudin ipsum a varius.</p>
          <p>Phasellus a ante convallis, consequat metus eget, malesuada mi. Suspendisse potenti. Aliquam in interdum tortor, nec viverra metus. Nam eget elit id mauris scelerisque tincidunt.</p>
          <p>Praesent accumsan, tortor id feugiat tempus, est lorem blandit justo, ut suscipit ligula sapien ut ligula. Suspendisse vel augue id arcu pellentesque varius. Integer commodo est eu risus egestas congue.</p>
        </section>

        <section id="about" className="section">
          <h2>About</h2>
          <p>About section of website</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer tincidunt arcu vel sem scelerisque, at viverra sapien congue. Nullam vestibulum accumsan est at convallis.</p>
          <p>Donec nec justo at ipsum convallis dictum. Aenean vulputate sit amet libero ac maximus. Proin euismod dictum ligula, sit amet venenatis sapien venenatis sed.</p>
          <p>Morbi rhoncus hendrerit dapibus. Curabitur ut aliquet enim, quis scelerisque justo. Aenean tincidunt, mi in fringilla iaculis, sapien libero viverra mi, ac cursus lectus ligula nec sem.</p>
          <p>Etiam at vehicula orci, a laoreet enim. Sed vel nisl sit amet magna ultricies fringilla. Aenean tempor, libero eu tempor tincidunt, massa turpis accumsan nulla, sit amet suscipit risus arcu eu felis.</p>
        </section>

        <section id="contact" className="section">
          <h2>Contact</h2>
          <p>Contact section</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ultricies vehicula purus, sed dictum turpis hendrerit nec. Curabitur sit amet felis justo. Sed sed volutpat libero.</p>
          <p>Pellentesque vel magna sapien. Quisque sollicitudin lacus id purus cursus bibendum. Duis nec tortor odio. Donec tincidunt vulputate lorem. Aenean ut eros vitae neque lacinia posuere.</p>
          <p>Nam suscipit fringilla ex, nec convallis metus posuere id. Duis et enim non velit facilisis viverra. Pellentesque aliquet libero quis nibh efficitur, non pellentesque arcu condimentum.</p>
          <p>Sed ullamcorper turpis eget nisl dictum, in gravida neque fermentum. Nam consequat libero nec massa venenatis porttitor.</p>
        </section>
      </main>

      <footer>
        <p>&copy; Assignment 1 - Single Page Website</p>
        <button id="backToTop" style={{ display: 'none' }}>Back to Top</button>
      </footer>
    </div>
  );
}

export default App;
