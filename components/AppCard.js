const AppCard = ({ children }) => (
  <div className="flex flex-grow justify-center p-4">
    <div className="flex flex-col w-full justify-center items-center max-w-4xl bg-white rounded-md px-4 pb-8 shadow-lg text-gray-500">
      {children}
    </div>
  </div>
);

export default AppCard;
