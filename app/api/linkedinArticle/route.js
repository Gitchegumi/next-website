import axios from "axios";

const LINKEDIN_API_URL = "https://api.linkedin.com/rest/posts?author=urn%3Ali%3Aorganization%3A40867841&q=author&count=1&sortBy=LAST_MODIFIED";
const accessToken = process.env.LINKEDIN_ACCESS_TOKEN;

export async function GET(req) {
  if (!accessToken) {
    console.error("Missing LinkedIn Access Token");
    return new Response(
      JSON.stringify({ error: "Missing LinkedIn Access Token" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  try {
     const response = await axios.get(LINKEDIN_API_URL, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "LinkedIn-Version": "202411",
        "X-Restli-Protocol-Version": "2.0.0",
        "X-RestLi-Method": "FINDER",
      },
    });

    const latestPost = response.data.elements[0];

    if (!latestPost) {
      return new Response(
        JSON.stringify({ error: "No posts found" }),
        {
          status: 404,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    return new Response(
      JSON.stringify({
        title: latestPost.content.article.title,
        description: latestPost.content.article.description,
        date: latestPost.createdAt,
        link: latestPost.content.article.source,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error(
      "Error fetching LinkedIn article:",
      error.response ? error.response.data : error.message
    );
    return new Response(
      JSON.stringify({ error: "Error fetching LinkedIn article" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
