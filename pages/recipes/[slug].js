import { createClient } from "contentful";
import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY,
});

export default function RecipeDetails({ recipe }) {
  console.log(recipe.items[0].fields);
  const { title, featuredImage, ingredients, cookingTime, method } =
    recipe.items[0].fields;

  return (
    <div>
      {title}
      <Image
        src={`https:${featuredImage.fields.file.url}`}
        width={featuredImage.fields.file.details.image.width}
        height={featuredImage.fields.file.details.image.height}
      />
      <h4>Ingredients</h4>
      <ul>
        {ingredients.map((item) => {
          return <li key={item}>{item}</li>;
        })}
      </ul>
      Cook Time: {cookingTime}
      <div>
        <h4>Method:</h4>
        {documentToReactComponents(method)}
      </div>
    </div>
  );
}

export const getStaticPaths = async () => {
  const res = await client.getEntries({ content_type: "recpie" });

  const paths = res.items.map((item) => {
    return {
      params: {
        slug: item.fields.slug,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const { slug } = context.params;
  const res = await client.getEntries({
    content_type: "recpie",
    "fields.slug": slug,
  });

  return {
    props: {
      recipe: res,
    },
  };
};
