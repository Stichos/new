export function Footer() {
  return (
    <section className="bg-[#13161B] px-4 lg:px-0 gap-10 mt-auto">
      <div className="container mx-auto flex flex-row lg:flex-row justify-between items-center py-5">
        <span className="text-gray-400 text-sm">© 2025 ZNode Network. All rights reserved.</span>
        <div className="flex gap-4 lg:mt-0 lg:ml-auto">
          <a className="text-sm text-gray-400 font-bold hover:underline hover:text-gray-300" href="#">Terms</a>
          <a className="text-sm text-gray-400 font-bold hover:underline hover:text-gray-300" href="#">Privacy</a>
          <a className="text-sm text-gray-400 font-bold hover:underline hover:text-gray-300" href="#">Cookies</a>
        </div>
      </div>
    </section>
  );
}
