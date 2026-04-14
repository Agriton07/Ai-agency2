export const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (!el) return;
  window.scrollTo({ 
    top: el.getBoundingClientRect().top + window.scrollY - 72, 
    behavior: "smooth" 
  });
};