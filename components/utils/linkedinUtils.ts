import axios from "axios";

const LINKEDIN_API_URL = "https://api.linkedin.com/rest/posts";
const accessToken = process.env.LINKEDIN_ACCESS_TOKEN;

export default async function handler(
  req: any,
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      json: {
        (arg0: {
          title?: any;
          description?: any;
          date?: any;
          link?: any;
          error?: string;
        }): void;
        new (): any;
      };
    };
  }
) {
  try {
    const response = await axios.get(
      `${LINKEDIN_API_URL}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "LinkedIn-Version": "202411",
        },
        params: {
          q: "author",
          organization: "urn:li:organization:40867841",
          count: 1,
        },
      }
    );

    const latestPost = response.data.elements[0];
    res.status(200).json({
      title: latestPost.title,
      description: latestPost.text,
      date: latestPost.created.time,
      link: latestPost.permalink,
    });
  } catch (error) {
    console.error("Error fetching LinkedIn article:", error);
    res.status(500).json({ error: "Error fetching LinkedIn article" });
  }
}
