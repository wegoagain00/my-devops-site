// Navigation functionality with hash-based routing
document.addEventListener("DOMContentLoaded", function () {
  const navButtons = document.querySelectorAll(".nav-btn");
  const sections = document.querySelectorAll(".section");

  // Handle navigation
  navButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const targetSection = this.getAttribute("data-section");
      navigateToSection(targetSection);
    });
  });

  // Handle hash changes (back/forward buttons)
  window.addEventListener("hashchange", handleHashChange);

  // Handle initial page load
  handleHashChange();

  function navigateToSection(sectionName) {
    // Update URL hash
    window.location.hash = sectionName;

    // Remove active class from all buttons and sections
    navButtons.forEach((btn) => btn.classList.remove("active"));
    sections.forEach((section) => section.classList.remove("active"));

    // Add active class to corresponding button and section
    const targetButton = document.querySelector(
      `[data-section="${sectionName}"]`
    );
    const targetSection = document.getElementById(sectionName);

    if (targetButton) targetButton.classList.add("active");
    if (targetSection) targetSection.classList.add("active");

    // Load blog posts if blog section is active
    if (sectionName === "blog") {
      loadBlogPosts();
    }
  }

  function handleHashChange() {
    const hash = window.location.hash.substring(1); // Remove #

    // Check if it's a blog post
    if (hash.startsWith("blog-")) {
      const postId = hash.substring(5); // Remove "blog-"
      navigateToSection("blog");
      setTimeout(() => showFullPost(postId), 100);
      return;
    }

    // Default section navigation
    const section = hash || "about";
    navigateToSection(section);
  }
});

// Blog posts data - Add posts here

const blogPosts = [
  {
    id: "devops-portfolio-site",

    title: "Building My DevOps Portfolio Site",

    date: "May 19, 2025",

    tags: ["DevOps", "Portfolio", "JavaScript"],

    excerpt:
      "A walkthrough of how I built and deployed my DevOps portfolio website.",

    content: ``,
  },

  {
    id: "github-actions-automation",

    title: "Automating Workflows with GitHub Actions",

    date: "May 31, 2025",

    tags: ["GitHub Actions", "CI/CD", "Automation"],

    excerpt:
      "How I used GitHub Actions to automate testing and deployment for my projects.",

    content: ``,
  },

  {
    id: "aws-three-tier-architecture",

    title: "Deploying a Three-Tier Architecture on AWS",

    date: "June 14, 2025",

    tags: ["AWS", "Cloud", "Infrastructure"],

    excerpt:
      "My experience designing and deploying a scalable three-tier architecture using AWS services.",

    content: ``,
  },

  {
    id: "terraform-infrastructure-as-code",

    title: "Infrastructure as Code with Terraform",

    date: "June 19, 2025",

    tags: ["Terraform", "IaC", "DevOps"],

    excerpt:
      "Lessons learned from managing cloud infrastructure using Terraform.",

    content: ``,
  },

  {
    id: "mern-docker-compose",

    title: "Deploying a MERN Stack App with Docker Compose",

    date: "June 24, 2025",

    tags: ["MERN", "Docker", "Docker Compose", "Full-Stack"],

    excerpt:
      "How to containerize and orchestrate a full MERN stack application using Docker Compose.",

    content: ``,
  },
];

// Blog functionality with hash-based links
function loadBlogPosts() {
  const blogContainer = document.getElementById("blog-posts");

  if (blogPosts.length === 0) {
    blogContainer.innerHTML = `
            <div class="blog-post">
                <p style="color: #ccc; font-style: italic;">
                    No blog posts found. Add your posts to the blogPosts array in script.js!
                </p>
            </div>
        `;
    return;
  }

  // Sort posts by date (newest first)
  const sortedPosts = [...blogPosts].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  blogContainer.innerHTML = sortedPosts
    .map(
      (post) => `
        <div class="blog-post">
            <h3><a href="#blog-${post.id}">${post.title}</a></h3>
            <div class="blog-meta">${post.date} • ${post.tags.join(", ")}</div>
            <div class="blog-excerpt">${post.excerpt}</div>
        </div>
    `
    )
    .join("");
}

// Show full blog post
function showFullPost(postId) {
  const post = blogPosts.find((p) => p.id === postId);
  if (!post) return;

  const blogContainer = document.getElementById("blog-posts");
  blogContainer.innerHTML = `
        <div class="blog-post-full">
            <button onclick="goBackToBlogList()" class="back-btn">← Back to all posts</button>
            <h2>${post.title}</h2>
            <div class="blog-meta">${post.date} • ${post.tags.join(", ")}</div>
            <div class="blog-content">${post.content}</div>
        </div>
    `;
}

// Function to go back to blog list
function goBackToBlogList() {
  window.location.hash = "blog";
  loadBlogPosts();
}

// Utility function to parse markdown frontmatter (for future use)
function parseFrontmatter(content) {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    return { frontmatter: {}, content };
  }

  const frontmatterText = match[1];
  const bodyContent = match[2];

  const frontmatter = {};
  frontmatterText.split("\n").forEach((line) => {
    const [key, ...valueParts] = line.split(":");
    if (key && valueParts.length > 0) {
      frontmatter[key.trim()] = valueParts
        .join(":")
        .trim()
        .replace(/^["']|["']$/g, "");
    }
  });

  return { frontmatter, content: bodyContent };
}

// Smooth scrolling for better UX
function smoothScroll(target) {
  const element = document.getElementById(target);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}
