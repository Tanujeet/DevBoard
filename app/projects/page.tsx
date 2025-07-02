import AddProject from "@/components/AddProject";

const page = () => {
  return (
    <main>
      <section>
        <div className=" max-w-4xl mx-auto p-6 flex justify-between">
          <h1 className="text-3xl font-bold">Projects</h1>
          <AddProject />
        </div>
        <input
          placeholder="Search Projects"
          className="ml-18 border border-black rounded-xl p-2 w-[600px]"
        />
      </section>
    </main>
  );
};

export default page;
