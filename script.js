// Navigation functionality
document.addEventListener("DOMContentLoaded", function () {
  const navButtons = document.querySelectorAll(".nav-btn");
  const sections = document.querySelectorAll(".section");

  // Handle navigation
  navButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const targetSection = this.getAttribute("data-section");

      // Remove active class from all buttons and sections
      navButtons.forEach((btn) => btn.classList.remove("active"));
      sections.forEach((section) => section.classList.remove("active"));

      // Add active class to clicked button and corresponding section
      this.classList.add("active");
      document.getElementById(targetSection).classList.add("active");

      // Load blog posts if blog section is clicked
      if (targetSection === "blog") {
        loadBlogPosts();
      }
    });
  });

  // Load blog posts on initial page load if blog section is active
  if (document.getElementById("blog").classList.contains("active")) {
    loadBlogPosts();
  }
});

// Blog posts data - Add posts here
const blogPosts = [
  {
    id: "CI/CD Pipeline Automation with GitHub Actions ",
    title: "CI/CD Pipeline Automation with GitHub Actions",
    date: "June 19, 2025",
    tags: ["GitHub Actions", "CI/CD", "YAML"],
    excerpt: "tbc",
    content: `
            <p>blog coming soon...<p>
        `,
  },
  {
    id: "Three Tier Architecture with AWS",
    title: "Three Tier Architecture with AWS",
    date: "June 20, 2025",
    tags: ["AWS", "Terraform"],
    excerpt: "tbc",
    content: `
            <p>blog coming soon...<p>
        `,
  },
];

// Blog functionality
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
            <h3><a href="#" onclick="showFullPost('${
              post.id
            }'); return false;">${post.title}</a></h3>
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
            <button onclick="loadBlogPosts()" class="back-btn">← Back to all posts</button>
            <h2>${post.title}</h2>
            <div class="blog-meta">${post.date} • ${post.tags.join(", ")}</div>
            <div class="blog-content">${post.content}</div>
        </div>
    `;
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
