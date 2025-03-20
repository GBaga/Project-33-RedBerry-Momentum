const BurgerMenuButton = ({ menuOpen, setMenuOpen }) => (
  <button
    onClick={() => setMenuOpen((prev) => !prev)}
    className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-400 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 md:hidden"
    aria-expanded={menuOpen}
  >
    <span className="sr-only">Open main menu</span>
    <svg className="w-5 h-5" aria-hidden="true" fill="none" viewBox="0 0 17 14">
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M1 1h15M1 7h15M1 13h15"
      />
    </svg>
  </button>
);

export default BurgerMenuButton;
