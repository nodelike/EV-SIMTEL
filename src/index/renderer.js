function showSubItems(subMenuId, menuId) {
  // Hide all sub-menus
  document.querySelectorAll('.sub-menu').forEach(menu => menu.style.display = 'none');
  document.querySelectorAll('.menuItem').forEach(item => item.classList.remove('active'));
  // Show the selected sub-menu
  document.getElementById(subMenuId).style.display = 'block';
  document.getElementById(menuId).classList.add('active');
}