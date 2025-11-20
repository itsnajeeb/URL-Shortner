const Footer = () => {
  return (
    <footer className="bg-gray-100 text-center py-4 mt-10 border-t">
      <p className="text-gray-600 text-sm">
        © {new Date().getFullYear()} URL Shortener — Build with React & Node.js
      </p>
    </footer>
  );
};

export default Footer;
