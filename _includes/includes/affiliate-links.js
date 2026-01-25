<script>
  document.addEventListener("DOMContentLoaded", function() {
    // Select all links
    const links = document.querySelectorAll("a");

    links.forEach(link => {
      const href = link.getAttribute("href");

      // Only modify external or affiliate links
      if (href && !href.startsWith(window.location.origin)) {
        link.setAttribute("target", "_blank");
        link.setAttribute("rel", "nofollow noopener");
      }
    });
  });
</script>
