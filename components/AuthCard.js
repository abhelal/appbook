const AuthCard = ({ children }) => (
  <div className="flex absolute inset-0 items-center flex-col sm:justify-center px-4 pt-20 sm:pt-6">
    <div className="w-full sm:max-w-md px-6 sm:px-8 py-4 shadow-sm sm:border overflow-hidden rounded-md bg-white">
      {children}
    </div>
  </div>
);

export default AuthCard;
