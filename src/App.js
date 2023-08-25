import "./style.css";
import Header from "./Header.js";
import NewFactForm from "./NewFactForm.js";
import CategoryFilter from "./CategoryFilter.js";
import FactList from "./FactList.js";
import { useEffect, useState } from "react";
import supabase from "./supabase";
import Loader from "./Loader";
 

const CATEGORIES = [
  { name: "classes", color: "#FF8551" },
  { name: "clubs", color: "#F3AA60" },
  { name: "dining halls", color: "#F2BE2280" },
  { name: "dorms", color: " #E9B384" },
  { name: "parties", color: " #9BCDD2" },
  { name: "weekends", color: "#7C9D96" },
  { name: "providence", color: "" },
];

function App() {
  const [isFormShown, setIsFormShown] = useState(true);
  const [factList, setFactList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currCategory, setCurrCategory] = useState("all");

  useEffect(
    function () {
      async function getFacts() {
        setIsLoading(true);

        let query = supabase.from("facts").select("*");

        if (currCategory.toUpperCase() !== "ALL")
          query = query.eq("category", currCategory);

        const { data: facts, error } = await query
          .order("votesInteresting", { ascending: false })
          .limit(1000);

        if (!error) setFactList(facts);
        else alert("There was a problem getting data");
        setIsLoading(false);
      }

      getFacts();
    },
    [currCategory]
  );

  function toggleForm() {
    isFormShown ? setIsFormShown(false) : setIsFormShown(true);
  }

  function newFact(newFact) {
    //use setFactList
    {
      console.log("created a new fact!");
      // setIsFormShown(false);

      //insert a row into supabase
      async function insertSupabase() {
        const { data, error } = await supabase
          .from("facts")
          .insert([newFact])
          .select();
        setFactList([...factList, newFact]);
      }

      insertSupabase();
    }
  }

  function selectCategory(category) {
    setCurrCategory(category);
  }

  function updateFact(fact) {
    async function update() {
      const { data, error } = await supabase
        .from("facts")
        .update({ other_column: "otherValue" })
        .eq("some_column", "someValue")
        .select();
    }
    update();
  }

  async function handleVote(columnName, fact) {
    console.log("handleVote Called");
    const { data: updatedFact, error } = await supabase
      .from("facts")
      .update({
        [columnName]: factList.find((f) => f.id === fact.id)[columnName] + 1,
      })
      .eq("id", fact.id)
      .select();

    if (!error)
      setFactList((factList) =>
        factList.map((f) => (f.id === fact.id ? updatedFact[0] : f))
      );

    console.log("handleVote Finished");
  }

  async function removeFact(fact) {
    console.log("deleting fact id is " + fact.id);
    const { error } = await supabase.from("facts").delete().eq("id", fact.id);
    setFactList((factList) => factList.filter((f) => f.id !== fact.id));
  }

  return (
    <div>
      <Header isFormShown={isFormShown} toggleForm={toggleForm} />
      {isFormShown ? (
        <NewFactForm categories={CATEGORIES} newFact={newFact} />
      ) : null}
      <main className="main">
        <CategoryFilter
          categories={CATEGORIES}
          selectCategory={selectCategory}
        />
        {isLoading ? (
          <Loader />
        ) : (
          <FactList
            facts={factList}
            categories={CATEGORIES}
            fullFactList={factList}
            setFactList={setFactList}
            handleVote={handleVote}
            removeFact={removeFact}
          />
        )}
      </main>
    </div>
  );
}

export default App;
