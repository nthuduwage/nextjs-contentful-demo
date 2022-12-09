import { createClient } from "contentful";
import { RecipeCard } from "../components/RecipeCard";

export default function Recipes({recpies}) {

  console.log(recpies);

  return (
    <div className="recipe-list">
      {recpies.map(recpie =>(<RecipeCard key={recpie.sys.id} recpie={recpie}/>))}

      <style jsx>{`
        .recipe-list{
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-gap: 20px 60px;
        }
      `}</style>
    </div>
  )
}


export async function getStaticProps(){

  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  });

  const res = await client.getEntries({content_type: 'recpie'})
  console.log(res)

  return{
    props: {
      recpies:res.items,
    }
  }
}