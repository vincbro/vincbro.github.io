import { useEffect, useState } from "react";
import "./index.css";

interface Repo {
  name: string;
  description: string;
  stargazers_count: number;
  html_url: string;
}

const CACHE_KEY = "github-repos";
const CACHE_DURATION = 24 * 60 * 60 * 1000;

function App() {
  const [repos, setRepos] = useState<Repo[]>([]);

  useEffect(() => {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_DURATION) {
        setRepos(data);
        return;
      }
    }

    fetch(
      "https://api.github.com/users/vincbro/repos?sort=updated&per_page=100",
    )
      .then((res) => res.json())
      .then((data) => {
        const sorted = data
          .sort((a: Repo, b: Repo) => b.stargazers_count - a.stargazers_count)
          .slice(0, 5);
        setRepos(sorted);
        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({ data: sorted, timestamp: Date.now() }),
        );
      })
      .catch(console.error);
  }, []);

  return (
    <div className="container">
      <header>
        <p className="role">vincbro</p>
        <h1 className="name">Vincent Brodin</h1>
        <p className="tagline">I build fast stuff 🦀</p>
        <nav className="nav">
          <a href="#work">View Work</a>
          <a href="#contact">Get in Touch</a>
        </nav>
      </header>

      <section id="work">
        <h2>Selected Work</h2>
        <div className="work-list">
          {repos.map((repo) => (
            <a
              key={repo.name}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="work-item"
            >
              <span className="repo-name">{repo.name}</span>
              <span className="repo-description">
                {repo.description || "No description"}
              </span>
              <span className="repo-stars">★ {repo.stargazers_count}</span>
            </a>
          ))}
        </div>
      </section>

      <section id="contact">
        <h2>Get in Touch</h2>
        <div className="contact-links">
          <a href="mailto:vincent.brodin21@gmail.com">Mail</a>
          <a
            href="https://github.com/vincbro"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/vincent-brodin-820051242/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </div>
      </section>

      <footer>
        <span>© 2026 Vincent Brodin</span>
        <span>simplicity is found in transparency, not abstraction</span>
      </footer>
    </div>
  );
}

export default App;
