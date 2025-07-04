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
    id: "github-actions-automation",

    title: "Automating Workflows with GitHub Actions",

    date: "May 31, 2025",

    tags: ["GitHub Actions", "CI/CD", "Automation"],

    excerpt:
      "How I used GitHub Actions to automate testing and deployment for my Devops Portfolio.",

    content: `
<p>I'm happy to say welcome to my blog and my first ever post! It will be all devops focused and may even include content such as my everyday use of linux since its a big part of my Devops journey.</p>
<p>Let's begin this blog with my first project that i created and this was both curiosity of figuring out is there a fast way of uploading my site automatically after changes and also following my journey to Devops. I wanted a place to showcase my projects and talk to you guys about my journey. It wasn't the most difficult task, but it was tedious and prone to error. So I decided to create a static HTML,CSS,JS website to showcase this, but I had the issue of manually uploading files to a platform to host. In my DevOps journey I actually learnt about <strong>GitHub Actions</strong> so of course after learning how organisations implement and use Github Actions I had to so this idea came in to streamline my entire workflow. 🚀</p>

<hr>

<h3>What are GitHub Actions?</h3>
<p>GitHub Actions is a powerful and flexible automation tool built right into GitHub. It allows you to create custom software development lifecycle workflows directly in your repository. You can use it for all sorts of things, but it's especially popular for <strong>Continuous Integration/Continuous Deployment (CI/CD)</strong>, which is exactly what I needed.</p>
<p>At its core, GitHub Actions uses YAML files to define these workflows. These files specify what events should trigger the workflow (like a push to a specific branch), and what jobs and steps should be executed.</p>

<hr>

<h3>My "Devops Website" Workflow</h3>
<p>To automate my website's deployment, I created a workflow file in my <a
                href="https://github.com/wegoagain00/my-devops-site"
                target="_blank" class="project-link"> repository </a>at <code>.github/workflows/main.yml</code>. Here's a breakdown of the script I used and what each part does:</p>

<pre><code class="language-yaml">
# Name of my workflow
name: Devops Website

# Controls when the action will run.
# We'll trigger it on a push to the 'main' branch.
on:
  push:
    branches: ["main"]
  # Allows you to run this workflow manually from the Actions tab
  workflow_dispatch:

# A workflow run is made up of one or more jobs that can run sequentially/parallel
jobs:
  # This job is named "deploy"
  deploy:
    # The type of runner that the job will run on
    runs-on: ubuntu-latest

    # Grant GITHUB_TOKEN the permissions it needs to deploy to GitHub Pages
    permissions:
      contents: read
      pages: write
      id-token: write

    # Steps represent a sequence of tasks that will be executed as part of the job
    steps:
      # Step 1: Check out your repository code so the workflow can access it
      - name: Checkout code
        uses: actions/checkout@v4

      # Step 2: Configure GitHub Pages
      - name: Setup Pages
        uses: actions/configure-pages@v5

      # Step 3: "Build" your site by creating an artifact
      # For a static site, this just means packaging all the files.
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          # Upload the root directory of your repository
          path: "."

      # Step 4: Deploy the artifact to GitHub Pages
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
</code></pre>

<h4>Triggering the Workflow</h4>
<p>The <code>on</code> section defines what triggers the workflow. In my case, it's a <code>push</code> to the <code>main</code> branch. This means that every time I merge new changes into my main branch, this action will automatically run. I also added <code>workflow_dispatch</code>, which allows me to run the workflow manually from the Actions tab in GitHub if I ever need to.</p>

<h4>The "Deploy" Job</h4>
<p>I have a single job in this workflow, which I've named <code>deploy</code>. This job runs on an <code>ubuntu-latest</code> runner, which is essentially a fresh virtual machine hosted by GitHub.</p>
<p>I've also specified some <code>permissions</code>. These are important for security and ensure that the workflow has just enough access to do what it needs to do. In this case, it needs to read the contents of my repository and write to the GitHub Pages environment.</p>

<h4>The Steps</h4>
<p>This is where the magic happens. The <code>steps</code> section is a sequence of tasks that are executed in order:</p>
<ol>
    <li><strong>Checkout code</strong>: The first step uses a pre-built action called <code>actions/checkout@v4</code>. This action checks out my repository's code into the runner, so the subsequent steps can access it.</li>
    <li><strong>Setup Pages</strong>: Next, <code>actions/configure-pages@v5</code> prepares the environment for a GitHub Pages deployment.</li>
    <li><strong>Upload artifact</strong>: This is where my static site gets "built." Since my website is just HTML, CSS, and JavaScript, the "build" process is simply a matter of packaging up all the files. The <code>actions/upload-pages-artifact@v3</code> action takes care of this, creating an artifact from the root (<code>.</code>) of my repository.</li>
    <li><strong>Deploy to GitHub Pages</strong>: Finally, <code>actions/deploy-pages@v4</code> takes the artifact created in the previous step and deploys it to GitHub Pages.</li>
</ol>

<hr>

<h3>The Result</h3>
<p>Now, whenever I push a change to my <code>main</code> branch, this GitHub Action automatically kicks off, and within a minute or two, my updated website is live. It's a simple, elegant solution that has saved me a surprising amount of time and effort. If you have a personal website or project hosted on GitHub, I highly recommend giving GitHub Actions a try. It's a fantastic way to automate your workflow and focus on what really matters: creating great things. ✨</p>
<p>This is a simple github actions projects to get started, as I dive in deeper I can see it getting more complicated but as always baby steps, my next project will integrate Github Actions to a more complex level!</p>`,
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
