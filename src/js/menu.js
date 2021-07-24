export const activeMenu = (hamburgerId, menuId) => {
  const hamburger   = document.getElementById(hamburgerId),
        menu        = document.getElementById(menuId),
        btn         = document.getElementById(hamburgerId)
  let   menuOpen    = false;

  if(hamburger && menu) {
    hamburger.addEventListener('click', () => {
      if(!menuOpen) {
        btn.classList.add('open');
        menuOpen = true;
      } else {
        btn.classList.remove('open');
        menuOpen = false;
      }
      menu.classList.toggle('show')
    })
  }
}

export const activeMenuLink = () => {
  const menu = document.getElementById('menu')
  if (menu) {
      const links = Array.from(menu.querySelectorAll('a'))
      links.map(link => {
          if (link.href === location.href || link.href === location.href.slice(0,-1)) link.classList.add('menu-nav__link--active')
      })
  }
}

export const stickyMenu = () => {
  const $MENU = document.querySelector('header')

  if($MENU && window.matchMedia('(min-width: 768px)').matches) {
    window.addEventListener('scroll', () => {
      $MENU.classList.toggle('menu--sticky', window.scrollY > 0)
    })
  }
}
