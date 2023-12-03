import Link from "next/link";
import getFormattedDate from "@/lib/getFormattedDate";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

type Props = {
  post: BlogPost;
};

export default async function ListItem({ post }: Props) {
  const { blog_id, title, author_name, publication_date } = post;
  const formattedDate = getFormattedDate(publication_date);
  const supabase = createServerComponentClient({ cookies });
  const CDN = "https://cswwcnqbthtmsfmrcmke.supabase.co/storage/v1/object/public/icons/public/";
  const id = blog_id;
  const url = CDN + 'icon' + id + '.png';
  const h = 200;
  const w = 300;

  return (
    <div>
      <li className="p-4 shadow-md rounded-md border border-blue-400" key={blog_id}>
        <img
          src={url}
          alt={title}
          className="w-full h-56 object-cover mb-4 rounded-md"
        />
        <h2 className="text-xl font-semibold mb-2 line-clamp-1">
          <Link href={`/posts/${blog_id}`}>{title}</Link>
        </h2>
        <p className="text-gray-300 mb-2">By {author_name} </p>
        <p className="text-gray-400 mb-2">{formattedDate}</p>
      </li>
      <br />
    </div>
  );
}
