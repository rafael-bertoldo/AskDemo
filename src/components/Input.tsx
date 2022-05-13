export const Input = () => {
  return (
    <div className="h-auto flex flex-col items-center w-96 p-8">
      <div className="flex items-center mb-4">
        <label className="mr-4">Email: </label>
        <input type="text" className="w-full bg-lightGray p-1 rounded" />
      </div>
      <div className="flex items-center mb-4">
        <label className="mr-4">Senha: </label>
        <input type="text" className="w-full bg-lightGray p-1 rounded" />
      </div>
    </div>
  );
};
