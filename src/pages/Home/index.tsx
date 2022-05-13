import { Navbar } from "../../components/Navbar";

export const Home = () => {
  return (
    <>
      <Navbar userName="Rafael" />
      <main className="w-screen h-screen bg-white flex items-center justify-center flex-col">
        <div className="mb-8 flex flex-col text-center">
          <h1 className="font-bold text-darkBlue text-5xl mb-8">Ask.demo</h1>
          <h3 className="text-mediumBlue font-bold text-xl">
            Faça perguntas para o instrutor
          </h3>
        </div>
        <form className="w-9/12 shadow-3xl rounded-xl h-96 flex justify-center">
          <h2 className="mt-8 font-bold text-3xl">Bem vindo de volta</h2>
        </form>
      </main>
    </>
  );
};
